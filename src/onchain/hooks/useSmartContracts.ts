
import { useState, useCallback } from 'react';
import { MidnightClient, MIDNIGHT_CONFIG, type TokenCreationParams, type DistributionParams } from '@/onchain/contracts/MidnightClient';
import { AidTokenContract } from '@/onchain/contracts/AidTokenContract';
import { toast } from 'sonner';

export const useSmartContracts = () => {
  const [client, setClient] = useState<MidnightClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializeClient = useCallback(async () => {
    try {
      setIsLoading(true);
      const midnightClient = new MidnightClient(MIDNIGHT_CONFIG);
      await midnightClient.connectWallet();
      setClient(midnightClient);
      setIsConnected(true);
      toast.success('Connected to Midnight blockchain');
    } catch (error) {
      toast.error('Failed to connect to Midnight blockchain', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deployToken = useCallback(async (params: TokenCreationParams) => {
    if (!client) {
      throw new Error('Midnight client not initialized');
    }

    try {
      setIsLoading(true);
      const deployment = await client.deployTokenContract(params);
      toast.success('Smart contract deployed successfully', {
        description: `Contract Address: ${deployment.contractAddress.slice(0, 10)}...`,
      });
      return deployment;
    } catch (error) {
      toast.error('Failed to deploy smart contract', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const distributeTokens = useCallback(async (params: DistributionParams) => {
    if (!client) {
      throw new Error('Midnight client not initialized');
    }

    try {
      setIsLoading(true);
      const txHash = await client.distributeTokens(params);
      toast.success('Tokens distributed successfully', {
        description: `Transaction: ${txHash.slice(0, 10)}...`,
      });
      return txHash;
    } catch (error) {
      toast.error('Failed to distribute tokens', {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  const getTokenContract = useCallback((contractAddress: string) => {
    if (!client) {
      throw new Error('Midnight client not initialized');
    }
    return new AidTokenContract(contractAddress, client);
  }, [client]);

  return {
    client,
    isConnected,
    isLoading,
    initializeClient,
    deployToken,
    distributeTokens,
    getTokenContract,
  };
};
