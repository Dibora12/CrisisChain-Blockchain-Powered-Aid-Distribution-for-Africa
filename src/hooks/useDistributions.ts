import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSmartContracts } from '@/onchain/hooks/useSmartContracts';
import { toast } from 'sonner';

export interface Distribution {
  id: string;
  aid_request_id: string;
  distributor_id: string;
  recipient_id: string;
  amount: number;
  token_contract_address?: string;
  midnight_tx_hash?: string;
  shielded_memo?: string;
  status: string;
  distributed_at?: string;
  created_at: string;
}

export const useDistributions = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['distributions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('distributions')
        .select('*')
        .or(`distributor_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Distribution[];
    },
    enabled: !!user,
  });
};

export const useCreateDistribution = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { distributeTokens, initializeClient, isConnected } = useSmartContracts();

  return useMutation({
    mutationFn: async (distribution: Partial<Distribution>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Ensure required fields are present
      if (!distribution.aid_request_id || !distribution.recipient_id || !distribution.amount) {
        throw new Error('Aid request ID, recipient ID, and amount are required');
      }

      // Get the token contract address (assuming we have a default token)
      const { data: tokens } = await supabase
        .from('tokens')
        .select('contract_address')
        .eq('is_active', true)
        .limit(1);

      if (!tokens || tokens.length === 0) {
        throw new Error('No active tokens found. Please create a token first.');
      }

      const tokenAddress = tokens[0].contract_address;

      // Initialize smart contract client if not connected
      if (!isConnected) {
        await initializeClient();
      }

      // Execute the distribution through smart contract
      const txHash = await distributeTokens({
        tokenAddress,
        recipient: distribution.recipient_id,
        amount: distribution.amount,
        memo: distribution.shielded_memo,
      });

      // Save distribution record to database
      const { data, error } = await supabase
        .from('distributions')
        .insert({
          aid_request_id: distribution.aid_request_id,
          distributor_id: user.id,
          recipient_id: distribution.recipient_id,
          amount: distribution.amount,
          token_contract_address: tokenAddress,
          midnight_tx_hash: txHash,
          shielded_memo: distribution.shielded_memo,
          status: 'completed', // Changed from 'confirmed' to 'completed'
          distributed_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log the real transaction
      await supabase.from('midnight_transactions').insert({
        tx_hash: txHash,
        tx_type: 'distribution',
        from_address: user.id,
        to_address: distribution.recipient_id,
        amount: distribution.amount,
        shielded: true,
        status: 'confirmed',
        metadata: {
          token_contract_address: tokenAddress,
          aid_request_id: distribution.aid_request_id,
        },
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['distributions'] });
      toast.success('Distribution executed successfully with Midnight privacy protection');
    },
    onError: (error) => {
      toast.error('Failed to execute distribution', {
        description: error.message,
      });
    },
  });
};
