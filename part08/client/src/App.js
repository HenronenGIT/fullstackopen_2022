import React from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";
// import LoginForm from "./components/LoginForm";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  // const [token, setToken] = useState(null);

  const authors_query = useQuery(ALL_AUTHORS);
  const books_query = useQuery(ALL_BOOKS);

  if (authors_query.loading) return <div>loading...</div>;
  if (books_query.loading) return <div>loading...</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {/* <button onClick={() => setPage("login")}>login</button> */}
      </div>
      {page === "authors" ? (
        <Authors authors={authors_query.data.allAuthors} />
      ) : page === "books" ? (
        <Books books={books_query.data.allBooks} />
      ) : (
        // ) : page === "add" ? (
        <NewBook show={page === "add"} />
      )}
    </div>
  );
};

export default App;
