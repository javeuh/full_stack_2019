import React, { useState } from "react";

const Person = ({ person, number }) => {
    console.log(person, number);
    return (
        <li>
            <p>
                {person} {number}
            </p>
        </li>
    );
};

const App = () => {
    const emptyPerson = {
        name: "",
        number: ""
    };

    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "092-999-222" },
        { name: "Jani Kis", number: "092-999-222" },
        { name: "Erkki Kovero", number: "092-999-222" },
        { name: "Salla Markku", number: "092-999-222" }
    ]);
    const [newPerson, setNewPerson] = useState(emptyPerson);
    const [searchTerm, setSearchTerm] = useState("");

    const personIsFound = personName =>
        persons.find(person => person.name === personName);

    const insertNew = () => {
        setPersons(persons.concat(newPerson));
        setNewPerson(emptyPerson);
    };

    const handleChange = event => {
        const eventValue = event.target.value;
        const eventName = event.target.name;
        const personCopy = { ...newPerson };
        personCopy[eventName] = eventValue;
        setNewPerson(personCopy);
    };

    const handleSearch = event => {
        const searchInput = event.target.value;
        setSearchTerm(searchInput);
    };

    const addNewContact = event => {
        event.preventDefault();
        !!personIsFound(newPerson.name)
            ? alert(`${newPerson.name} is already added to phonebook`)
            : insertNew();
    };

    const contactRows = () => {
        const filteredPersons = persons.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredPersons.map((filteredPerson, index) => (
            <Person
                key={index}
                person={filteredPerson.name}
                number={filteredPerson.number}
            />
        ));
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <h3>Filter numbers</h3>
            <div>
                Search contacts:{" "}
                <input
                    name="name"
                    onChange={handleSearch}
                    placeholder="Search with name"
                />
            </div>
            <h3>Add new contact</h3>
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
            <h3>Numbers</h3>
            <ul>{contactRows()}</ul>
        </div>
    );
};

export default App;
