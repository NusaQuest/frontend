import React from "react";
import Content from "./Content";
import { darkTheme, defaultConfig, XellarKitProvider } from "@xellar/kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

// const config = defaultConfig({
//   appName: "NusaQuest",
//   walletConnectProjectId: `${import.meta.env.REOWN_PROJECT_ID}`,
//   xellarAppId: `${import.meta.env.XELLAR_APP_ID}`,
//   xellarEnv: "sandbox",
// });

// const queryClient = new QueryClient();

function App() {
  return (
    // <WagmiProvider config={config}>
    //   <QueryClientProvider client={queryClient}>
    //     <XellarKitProvider theme={darkTheme}>
    //       <Content />
    //     </XellarKitProvider>
    //   </QueryClientProvider>
    // </WagmiProvider>
    <Content />
  );
}

export default App;
