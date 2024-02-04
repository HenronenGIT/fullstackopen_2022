import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Select from "react-select";

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = () => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(UPDATE_AUTHOR);

  const authors_query = useQuery(ALL_AUTHORS);

  if (authors_query.loading) return <div>loading...</div>;

  const authors = authors_query.data.allAuthors;

  const handleAuthorSubmit = (event) => {
    event.preventDefault();
    const bornInt = parseInt(born);
    const name: any = selectedOption.value;
    if (selectedOption) {
      editAuthor({
        variables: { name, setBornTo: bornInt },
      });
      setSelectedOption(null);
      setBorn("");
    } else {
      console.error("No author selected");
    }
  };

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

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
      <form onSubmit={handleAuthorSubmit}>
        <Select
          defaultValue={selectedOption}
          options={options}
          onChange={setSelectedOption}
        ></Select>
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">Update Author</button>
        <br />
      </form>
    </div>
  );
};

export default Authors;
