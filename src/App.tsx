import React from "react";
import "./App.css";
import ApolloProvider from "./util/ApolloProvider";
import Routes from "./Routes";

function App() {
  return (
    <ApolloProvider>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
