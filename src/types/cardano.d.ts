
interface CardanoAPI {
  enable(): Promise<any>;
  getUsedAddresses(): Promise<string[]>;
  getUnusedAddresses(): Promise<string[]>;
  getBalance(): Promise<string>;
}

interface Cardano {
  lace?: CardanoAPI;
}

declare global {
  interface Window {
    cardano?: Cardano;
  }
}

export {};
