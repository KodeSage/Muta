/** @format */

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://api.thegraph.com/subgraphs/name/kodesage/muta_v2",
	cache: new InMemoryCache(),
});

export default client;
