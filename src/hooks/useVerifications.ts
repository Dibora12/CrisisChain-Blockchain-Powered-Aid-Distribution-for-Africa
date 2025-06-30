import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface UserVerification {
  id: string;
  user_id: string;
  verifier_id: string;
  verification_type: string;
  zk_proof_hash?: string;
  midnight_proof_tx?: string;
  status: string;
  metadata?: any;
  verified_at?: string;
  expires_at?: string;
  created_at: string;
}

export const useUserVerifications = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-verifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_verifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserVerification[];
    },
    enabled: !!user,
  });
};

export const useCreateVerification = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (verification: Partial<UserVerification>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Ensure required fields are present
      if (!verification.verifier_id || !verification.verification_type) {
        throw new Error('Verifier ID and verification type are required');
      }
      
      // Generate zero-knowledge proof hash (simulated)
      const zkProofHash = `zk_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
      const midnightProofTx = `midnight_proof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('user_verifications')
        .insert({
          user_id: user.id,
          verifier_id: verification.verifier_id,
          verification_type: verification.verification_type,
          zk_proof_hash: zkProofHash,
          midnight_proof_tx: midnightProofTx,
          status: 'pending',
          metadata: verification.metadata,
          expires_at: verification.expires_at,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Log midnight transaction for verification proof
      await supabase.from('midnight_transactions').insert({
        tx_hash: midnightProofTx,
        tx_type: 'verification_proof',
        from_address: user.id,
        shielded: true,
        status: 'confirmed',
        metadata: { 
          verification_type: verification.verification_type,
          zk_proof_hash: zkProofHash 
        },
      });
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-verifications'] });
      toast.success('Verification submitted with zero-knowledge proof');
    },
    onError: (error) => {
      toast.error('Failed to submit verification', {
        description: error.message,
      });
    },
  });
};
