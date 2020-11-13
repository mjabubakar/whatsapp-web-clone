import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message.includes("Not authenticated")) {
        localStorage.removeItem("token");
        window.location.reload();
      } else if (message.includes("jwt")) {
        localStorage.removeItem("token");
        window.location.reload();
      } else if (networkError) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
});

const uploadLink = createUploadLink({
  uri: "http://localhost:3001/graphql",
});

let httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const token = localStorage.getItem("token");

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//@ts-ignore
httpLink = errorLink.concat(authLink.concat(uploadLink).concat(httpLink));
const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: token ? `Bearer ${token}` : "",
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  //@ts-ignore
  httpLink
);

export const client = new ApolloClient({
  //@ts-ignore
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

const ApolloProvider: React.FC<{}> = (props: any) => {
  return <Provider client={client} {...props} />;
};
export default ApolloProvider;
