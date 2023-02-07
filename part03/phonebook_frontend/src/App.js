import { useEffect, useState } from "react";
import React from "react";
import personService from "./services/persons.js";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const deleteUser = (id) => {
    const person = persons.find((n) => n.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteUser(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      ></Notification>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add new</h3>
      <Form
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setPersons={setPersons}
        setNewNumber={setNewNumber}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        deleteUser={deleteUser}
      ></Persons>
    </div>
  );
};

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <form>
      <div>
        filter shown with:
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
    </form>
  );
};

const Form = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${personObject.name}`);
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(`${error.response.data.error}`);
          console.log(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    } else {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;

      const changedPerson = { ...person, number: newNumber };

      personService
        .putInfo(person.id, changedPerson)
        .then((editedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== editedPerson.id ? person : editedPerson
            )
          );
          setSuccessMessage(`Changed ${changedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
    }
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, deleteUser }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteUser(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) return;
  if (successMessage) return <div className="success">{successMessage}</div>;
  else return <div className="error">{errorMessage}</div>;
};

export default App;
