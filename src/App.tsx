import "./App.css";

import { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const PublicKey: FC = () => {
  const { publicKey } = useWallet();

  return (
    <p>{publicKey ? `Public Key: ${publicKey.toBase58()}` : `Not Connected`}</p>
  );
};

const App: FC = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new WalletConnectWalletAdapter({
        network,
        options: {
          projectId: "2a2a5978a58aad734d13a2d194ec469a",
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <PublicKey />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
