import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

import theme from "../theme";
import { AppProps } from "next/app";
import { getAccessToken } from "src/utils/accessToken";
import { __prod__ } from "src/constants";

const httpLink = createHttpLink({
  uri: __prod__ ? "" : "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
  credentials: "include",
  link: authLink.concat(httpLink),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
