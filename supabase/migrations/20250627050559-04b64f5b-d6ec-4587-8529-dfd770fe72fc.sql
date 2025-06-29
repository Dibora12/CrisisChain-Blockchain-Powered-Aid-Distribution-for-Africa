
-- Create enum types for various statuses
CREATE TYPE public.aid_request_status AS ENUM ('pending', 'approved', 'rejected', 'distributed');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE public.distribution_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE public.verifier_role AS ENUM ('community_leader', 'ngo_representative', 'government_official');
CREATE TYPE public.aid_type AS ENUM ('food', 'medical', 'shelter', 'water', 'education', 'emergency');

-- Aid requests table
CREATE TABLE public.aid_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  request_type aid_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  urgency_level INTEGER CHECK (urgency_level >= 1 AND urgency_level <= 5) DEFAULT 3,
  need_score DECIMAL(5,2) DEFAULT 0,
  status aid_request_status DEFAULT 'pending',
  zk_proof_hash TEXT, -- Zero-knowledge proof for eligibility
  midnight_tx_hash TEXT, -- Midnight transaction hash
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Distributions table
CREATE TABLE public.distributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  aid_request_id UUID REFERENCES public.aid_requests NOT NULL,
  distributor_id UUID REFERENCES auth.users NOT NULL,
  recipient_id UUID REFERENCES auth.users NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  token_contract_address TEXT,
  midnight_tx_hash TEXT,
  shielded_memo TEXT, -- Encrypted memo for privacy
  status distribution_status DEFAULT 'pending',
  distributed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Verifiers table
CREATE TABLE public.verifiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  role verifier_role NOT NULL,
  organization TEXT,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  midnight_address TEXT, -- Midnight wallet address
  reputation_score DECIMAL(3,2) DEFAULT 0,
  verifications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User verifications table (for zero-knowledge proofs)
CREATE TABLE public.user_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  verifier_id UUID REFERENCES public.verifiers NOT NULL,
  verification_type TEXT NOT NULL,
  zk_proof_hash TEXT, -- Zero-knowledge proof
  midnight_proof_tx TEXT, -- Midnight transaction containing the proof
  status verification_status DEFAULT 'pending',
  metadata JSONB, -- Additional verification data
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reports table for analytics and compliance
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  generated_by UUID REFERENCES auth.users NOT NULL,
  report_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  data JSONB, -- Report data and statistics
  date_range_start TIMESTAMP WITH TIME ZONE,
  date_range_end TIMESTAMP WITH TIME ZONE,
  privacy_level TEXT DEFAULT 'public', -- public, private, confidential
  midnight_hash TEXT, -- Hash stored on Midnight for integrity
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Aid tokens table for token management
CREATE TABLE public.aid_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID REFERENCES auth.users NOT NULL,
  token_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  token_type aid_type NOT NULL,
  contract_address TEXT NOT NULL,
  midnight_tx_hash TEXT,
  restrictions JSONB, -- Usage restrictions as JSON
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  used_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Midnight transactions log
CREATE TABLE public.midnight_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tx_hash TEXT NOT NULL UNIQUE,
  tx_type TEXT NOT NULL, -- 'distribution', 'verification', 'proof', etc.
  from_address TEXT,
  to_address TEXT,
  amount DECIMAL(10,2),
  shielded BOOLEAN DEFAULT false,
  block_height BIGINT,
  gas_used BIGINT,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.aid_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aid_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.midnight_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for aid_requests
CREATE POLICY "Users can view their own aid requests" 
  ON public.aid_requests FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own aid requests" 
  ON public.aid_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own aid requests" 
  ON public.aid_requests FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for distributions
CREATE POLICY "Users can view distributions they're involved in" 
  ON public.distributions FOR SELECT 
  USING (auth.uid() = distributor_id OR auth.uid() = recipient_id);

CREATE POLICY "Distributors can create distributions" 
  ON public.distributions FOR INSERT 
  WITH CHECK (auth.uid() = distributor_id);

-- RLS Policies for verifiers
CREATE POLICY "Anyone can view active verifiers" 
  ON public.verifiers FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Users can create verifier profiles" 
  ON public.verifiers FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_verifications
CREATE POLICY "Users can view their own verifications" 
  ON public.user_verifications FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS Policies for reports
CREATE POLICY "Users can view public reports" 
  ON public.reports FOR SELECT 
  USING (privacy_level = 'public');

CREATE POLICY "Users can view their own reports" 
  ON public.reports FOR SELECT 
  USING (auth.uid() = generated_by);

-- RLS Policies for aid_tokens
CREATE POLICY "Users can view their own tokens" 
  ON public.aid_tokens FOR SELECT 
  USING (auth.uid() = recipient_id);

-- RLS Policies for midnight_transactions
CREATE POLICY "Users can view transaction logs" 
  ON public.midnight_transactions FOR SELECT 
  USING (true); -- Public transaction log for transparency

-- Create indexes for better performance
CREATE INDEX idx_aid_requests_user_id ON public.aid_requests(user_id);
CREATE INDEX idx_aid_requests_status ON public.aid_requests(status);
CREATE INDEX idx_distributions_recipient_id ON public.distributions(recipient_id);
CREATE INDEX idx_distributions_status ON public.distributions(status);
CREATE INDEX idx_verifiers_location ON public.verifiers(location);
CREATE INDEX idx_user_verifications_user_id ON public.user_verifications(user_id);
CREATE INDEX idx_midnight_transactions_tx_hash ON public.midnight_transactions(tx_hash);
CREATE INDEX idx_aid_tokens_recipient_id ON public.aid_tokens(recipient_id);
