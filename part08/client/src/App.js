import React from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const [authors, setAuthors] = useState([]);

  client.query({ query }).then((response) => {
    console.log(response.data);
    setAuthors(response.data.allAuthors)
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={authors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
