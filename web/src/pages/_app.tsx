import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

import theme from "../theme";
import { AppProps } from "next/app";
import { getAccessToken, setAccessToken } from "src/utils/accessToken";
import { __prod__ } from "src/constants";
import { useState } from "react";

const httpLink = createHttpLink({
  uri: __prod__ ? "" : "http://localhost:5000/graphql",
  credentials: "include",
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
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
        console.log(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Make this some nice loading animation
    return <div> LOADING ...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
