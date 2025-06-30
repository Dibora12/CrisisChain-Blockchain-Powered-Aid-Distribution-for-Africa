
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    isMetaMask?: boolean;
  }
}
