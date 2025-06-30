
-- Create verifier_applications table
CREATE TABLE public.verifier_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  zk_verified BOOLEAN DEFAULT false,
  zk_proof_hash TEXT,
  midnight_tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tokens table
CREATE TABLE public.tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  supply NUMERIC NOT NULL DEFAULT 0,
  contract_address TEXT,
  midnight_tx_hash TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for verifier_applications
ALTER TABLE public.verifier_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications" 
  ON public.verifier_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.verifier_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.verifier_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for tokens
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all tokens" 
  ON public.tokens 
  FOR SELECT 
  TO authenticated;

CREATE POLICY "Users can create tokens" 
  ON public.tokens 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own tokens" 
  ON public.tokens 
  FOR UPDATE 
  USING (auth.uid() = creator_id);
