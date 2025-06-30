import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSmartContracts } from '@/onchain/hooks/useSmartContracts';
import { toast } from 'sonner';

export interface AidToken {
  id: string;
  recipient_id: string;
  token_id: string;
  amount: number;
  token_type: string;
  contract_address: string;
  midnight_tx_hash?: string;
  restrictions?: any;
  expires_at?: string;
  is_active: boolean;
  used_amount: number;
  created_at: string;
  updated_at: string;
}

export const useAidTokens = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['aid-tokens', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('aid_tokens')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AidToken[];
    },
    enabled: !!user,
  });
};

export const useCreateAidToken = () => {
  const queryClient = useQueryClient();
  const { getTokenContract, initializeClient, isConnected } = useSmartContracts();

  return useMutation({
    mutationFn: async (token: Partial<AidToken>) => {
      // Ensure required fields are present
      if (!token.recipient_id || !token.amount || !token.token_type) {
        throw new Error('Recipient ID, amount, and token type are required');
      }

      // Get the active token contract
      const { data: tokens } = await supabase
        .from('tokens')
        .select('contract_address')
        .eq('is_active', true)
        .limit(1);

      if (!tokens || tokens.length === 0) {
        throw new Error('No active tokens found. Please create a token first.');
      }

      const contractAddress = tokens[0].contract_address;

      // Initialize smart contract client if not connected
      if (!isConnected) {
        await initializeClient();
      }

      // Mint tokens to the recipient using smart contract
      const tokenContract = getTokenContract(contractAddress);
      const txHash = await tokenContract.mint(
        token.recipient_id,
        token.amount,
        {
          name: `${token.token_type} Aid Token`,
          symbol: 'AID',
          description: `Aid token for ${token.token_type}`,
          restrictions: Array.isArray(token.restrictions) ? token.restrictions : [],
          expirationDate: token.expires_at ? new Date(token.expires_at) : undefined,
        }
      );

      const tokenId = `AID_${Date.now()}`;
      
      const { data, error } = await supabase
        .from('aid_tokens')
        .insert({
          recipient_id: token.recipient_id,
          token_id: tokenId,
          amount: token.amount,
          token_type: token.token_type as any,
          contract_address: contractAddress,
          midnight_tx_hash: txHash,
          restrictions: token.restrictions,
          expires_at: token.expires_at,
          is_active: token.is_active !== false,
          used_amount: token.used_amount || 0,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log the real transaction
      await supabase.from('midnight_transactions').insert({
        tx_hash: txHash,
        tx_type: 'token_mint',
        to_address: token.recipient_id,
        amount: token.amount,
        shielded: true,
        status: 'confirmed',
        metadata: { 
          token_type: token.token_type,
          contract_address: contractAddress,
          token_id: tokenId,
        },
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aid-tokens'] });
      toast.success('Aid token created with real blockchain security');
    },
    onError: (error) => {
      toast.error('Failed to create aid token', {
        description: error.message,
      });
    },
  });
};
