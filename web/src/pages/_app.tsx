import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

import theme from "../theme";
import { getAccessToken, setAccessToken } from "src/utils/accessToken";
import { __prod__ } from "src/constants";
import { AccessToken } from "src/types";

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
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "access_token",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) return true;

        try {
          const decodedToken: AccessToken = jwtDecode(token);
          if (Date.now() >= decodedToken.exp * 1000) return false;
          return true;
        } catch (err) {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(__prod__ ? "" : "http://localhost:5000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    authLink,
    httpLink,
  ]),
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(__prod__ ? "" : "http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.access_token);
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
