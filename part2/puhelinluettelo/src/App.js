import React, { useState } from "react";

const Person = ({ person, number }) => {
    return (
        <li>
            <p>
                {person} {number}
            </p>
        </li>
    );
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "092-999-222" }
    ]);
    const [newPerson, setNewPerson] = useState({
        name: "",
        number: ""
    });

    const personIsFound = personName =>
        persons.find(person => person.name === personName);

    const handleChange = event => {
        const eventValue = event.target.value;
        const eventName = event.target.name;
        const personCopy = { ...newPerson };
        personCopy[eventName] = eventValue;
        setNewPerson(personCopy);
    };
    const addNewContact = event => {
        event.preventDefault();
        !!personIsFound(newPerson.name)
            ? alert(`${newPerson.name} is already added to phonebook`)
            : setPersons(persons.concat(newPerson));
    };

    const contactRows = () =>
        persons.map((person, index) => (
            <Person key={index} person={person.name} number={person.number} />
        ));

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewContact}>
                <div>
                    name:{" "}
                    <input
                        name="name"
                        value={newPerson.name}
                        onChange={handleChange}
                        placeholder="Enter new name"
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        name="number"
                        value={newPerson.number}
                        onChange={handleChange}
                        placeholder="Enter new number"
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>{contactRows()}</ul>
        </div>
    );
};

export default App;
