import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
    }
  }
`;

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  console.log("🚀 ~ Books ~ result:", result);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.loading ? (
            <div>loading...</div>
          ) : (
            result.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
