import React from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

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

  const result = useQuery(ALL_AUTHORS);
  const book_result = useQuery(ALL_BOOKS);

  if (result.loading) return <div>loading...</div>;
  if (book_result.loading) return <div>loading...</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {page === "authors" ? (
        <Authors authors={result.data.allAuthors} />
      ) : page === "books" ? (
        <Books books={book_result.data.allBooks} />
      ) : (
        <NewBook show={page === "add"} />
      )}
    </div>
  );
};

export default App;
