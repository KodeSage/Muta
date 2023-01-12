/** @format */

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
// import {
// 	LivepeerConfig,
// 	createReactClient,
// 	studioProvider,
// } from "@livepeer/react";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Muta",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

// const client = createReactClient({
// 	provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_ID }),
// });

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: "#ff61d0",
					accentColorForeground: "#ffffff",
					borderRadius: "small",
					fontStack: "system",
					overlayBlur: "small",
				})}>
				<Component {...pageProps} />
			</RainbowKitProvider>
			{/* <LivepeerConfig client={client}></LivepeerConfig> */}
		</WagmiConfig>
	);
}

export default MyApp;
