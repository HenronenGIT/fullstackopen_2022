// import React from "react";
// import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";

// const LOGIN = gql`
// mutation login($name: String!, $password: String!) {
//   login(username: $name, password: $password)  {
//     value
//     }`;

// const LoginForm = (props) => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const [login] = useMutation(LOGIN);

//   const submit = async (event) => {
//     event.preventDefault();

//     login({ variables: { name, password } });

//     setName("");
//     setPassword("");
//   };

//   return (
//     <div>
//       <form onSubmit={submit}>
//         <div>
//           name
//           <input
//             value={name}
//             onChange={({ target }) => setName(target.value)}
//           />
//         </div>
//         <div>
//           password
//           <input
//             value={password}
//             onChange={({ target }) => setPassword(target.value)}
//           />
//         </div>

//         <button type="submit">create book</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
