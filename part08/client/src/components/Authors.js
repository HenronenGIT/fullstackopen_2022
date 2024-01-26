import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(UPDATE_AUTHOR);

  const handleSubmit = (event) => {
    event.preventDefault();
    const bornInt = parseInt(born);

    editAuthor({ variables: { name, setBornTo: bornInt } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        name
        <input value={name} onChange={({ target }) => setName(target.value)} />
        <br />
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <button type="submit">Update Author</button>
        <br />
      </form>
    </div>
  );
};

export default Authors;
