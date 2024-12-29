import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, sepolia, tenet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "42eee7d49bf724a715ff5c03429883f7",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, tenet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <ThirdwebProvider
          activeChain={Sepolia}
          clientId="97f30a72fd582ebb8469e8118f80f2f3"
        >
          <Router>
            <StateContextProvider>
              <App />
            </StateContextProvider>
          </Router>
        </ThirdwebProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
