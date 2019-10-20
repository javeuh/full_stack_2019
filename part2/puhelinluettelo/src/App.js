import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter-component";
import NewContactForm from "./components/new-contact-form-component";
import Person from "./components/person-component";
import ContactList from "./components/contact-list-component";

const App = () => {
    const emptyPerson = {
        name: "",
        number: ""
    };
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState(emptyPerson);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then(response => {
            setPersons(response.data);
        });
    }, []);

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
            <Filter handleSearch={handleSearch} />
            <NewContactForm
                onSubmit={addNewContact}
                personName={newPerson.name}
                personNumber={newPerson.number}
                onChange={handleChange}
            />
            <ContactList contactRows={contactRows} />
        </div>
    );
};

export default App;
