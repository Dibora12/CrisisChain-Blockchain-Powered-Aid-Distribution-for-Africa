
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';

export interface MidnightTransaction {
  id: string;
  tx_hash: string;
  tx_type: string;
  from_address?: string;
  to_address?: string;
  amount?: number;
  shielded: boolean;
  block_height?: number;
  gas_used?: number;
  status: string;
  metadata?: any;
  created_at: string;
}

export const useMidnightTransactions = (limit = 50) => {
  return useQuery({
    queryKey: ['midnight-transactions', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('midnight_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as MidnightTransaction[];
    },
  });
};

export const useMidnightStats = () => {
  return useQuery({
    queryKey: ['midnight-stats'],
    queryFn: async () => {
      // Get total transactions
      const { count: totalTx } = await supabase
        .from('midnight_transactions')
        .select('*', { count: 'exact', head: true });
      
      // Get shielded transactions
      const { count: shieldedTx } = await supabase
        .from('midnight_transactions')
        .select('*', { count: 'exact', head: true })
        .eq('shielded', true);
      
      // Get total value transferred
      const { data: valueData } = await supabase
        .from('midnight_transactions')
        .select('amount')
        .not('amount', 'is', null);
      
      const totalValue = valueData?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;
      
      return {
        totalTransactions: totalTx || 0,
        shieldedTransactions: shieldedTx || 0,
        totalValueTransferred: totalValue,
        privacyRate: totalTx ? ((shieldedTx || 0) / totalTx * 100) : 0,
      };
    },
  });
};
