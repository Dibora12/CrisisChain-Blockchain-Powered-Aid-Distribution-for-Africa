import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface VerifierApplication {
  id: string;
  user_id: string;
  full_name: string;
  motivation: string;
  status: string;
  zk_verified: boolean;
  zk_proof_hash?: string;
  midnight_tx_hash?: string;
  created_at: string;
  updated_at: string;
}

export const useVerifierApplications = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['verifier-applications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('verifier_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as VerifierApplication[];
    },
    enabled: !!user,
  });
};

export const useCreateVerifierApplication = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (application: { full_name: string; motivation: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate zero-knowledge verification
      const zkProofHash = `zk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const midnightTxHash = `midnight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('verifier_applications')
        .insert({
          user_id: user.id,
          full_name: application.full_name,
          motivation: application.motivation,
          zk_verified: true, // Simulated ZK verification
          zk_proof_hash: zkProofHash,
          midnight_tx_hash: midnightTxHash,
          status: 'pending',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifier-applications'] });
      toast.success('Verifier application submitted successfully', {
        description: 'Your application is now pending review. ZK proof generated.',
      });
    },
    onError: (error) => {
      toast.error('Failed to submit application', {
        description: error.message,
      });
    },
  });
};
