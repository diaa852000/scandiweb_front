import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

const productsLink = new HttpLink({
  uri: `http://136.112.103.156:8080/product`,
});

const orderLink = new HttpLink({
  uri: `http://136.112.103.156:8080/order`,
});

const link = ApolloLink.split(
  (operation) => operation.getContext().clientName === "order",
  orderLink,
  productsLink
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
