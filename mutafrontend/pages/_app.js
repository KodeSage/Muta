/** @format */

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider } = configureChains(
	[chain.polygonMumbai],
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
	autoConnect: false,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains} theme={darTheme}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
