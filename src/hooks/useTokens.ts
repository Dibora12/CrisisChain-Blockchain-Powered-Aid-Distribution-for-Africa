import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSmartContracts } from '@/onchain/hooks/useSmartContracts';
import { toast } from 'sonner';

export interface Token {
  id: string;
  creator_id: string;
  name: string;
  symbol: string;
  supply: number;
  contract_address?: string;
  midnight_tx_hash?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Token[];
    },
  });
};

export const useCreateToken = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { deployToken, initializeClient, isConnected } = useSmartContracts();

  return useMutation({
    mutationFn: async (token: { name: string; symbol: string; supply: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      // Initialize smart contract client if not connected
      if (!isConnected) {
        await initializeClient();
      }

      // Deploy the smart contract
      const deployment = await deployToken({
        name: token.name,
        symbol: token.symbol,
        totalSupply: token.supply,
        creator: user.id,
      });

      // Save to database with real contract details
      const { data, error } = await supabase
        .from('tokens')
        .insert({
          creator_id: user.id,
          name: token.name,
          symbol: token.symbol,
          supply: token.supply,
          contract_address: deployment.contractAddress,
          midnight_tx_hash: deployment.transactionHash,
          is_active: true,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log the real transaction
      await supabase.from('midnight_transactions').insert({
        tx_hash: deployment.transactionHash,
        tx_type: 'token_creation',
        from_address: user.id,
        amount: token.supply,
        block_height: deployment.blockNumber,
        shielded: true,
        status: 'confirmed',
        metadata: { 
          contract_address: deployment.contractAddress,
          token_name: token.name,
          token_symbol: token.symbol 
        },
      });
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
      toast.success('Privacy token created successfully', {
        description: `${data.name} (${data.symbol}) deployed on Midnight network`,
      });
    },
    onError: (error) => {
      toast.error('Failed to create token', {
        description: error.message,
      });
    },
  });
};
