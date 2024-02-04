import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
      genres
    }
  }
`;

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  console.log("🚀 ~ Books ~ selectedGenre:", selectedGenre);

  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!result.loading) {
      const allBooks = result.data.allBooks;
      const filteredBooks = filterBooks();
      setBooks(filteredBooks);
      const genres = filterGenres(allBooks);
      setGenres(genres);
    }
  }, [result, selectedGenre]);

  const filterGenres = (allBooks) => {
    if (!allBooks) {
      return [];
    }
    const uniqueGenres = new Set(allBooks.flatMap((book) => book.genres));
    return Array.from(uniqueGenres);
  };

  const filterBooks = () => {
    if (selectedGenre === "") {
      return result.data.allBooks;
    }
    return result.data.allBooks.filter((book) =>
      book.genres.includes(selectedGenre)
    );
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.loading ? (
            <div>loading...</div>
          ) : (
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div>
        <>
          {genres.map((genre) => (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setSelectedGenre("")}>all genres</button>
        </>
      </div>
    </div>
  );
};

export default Books;
