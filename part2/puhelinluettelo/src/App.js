import React, { useState, useEffect } from "react";
import Filter from "./components/filter-component";
import NewContactForm from "./components/new-contact-form-component";
import Person from "./components/person-component";
import ContactList from "./components/contact-list-component";
import personService from "./services/persons";

const App = () => {
    const emptyPerson = {
        name: "",
        number: ""
    };
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState(emptyPerson);
    const [searchTerm, setSearchTerm] = useState("");

    const getNewPersons = () => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons);
        });
    };

    useEffect(getNewPersons, []);

    const personIsFound = personName =>
        persons.find(person => person.name === personName);

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

    const insertNew = () => {
        personService.create(newPerson).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
        });
        setNewPerson(emptyPerson);
    };

    const destroy = filtteredPerson => {
        if (
            window.confirm(
                `Are you sure you want to delete ${filtteredPerson.name}`
            )
        ) {
            personService
                .destroy(filtteredPerson.id)
                .then(response => {
                    getNewPersons();
                })
                .catch(err => {
                    alert(
                        `${filtteredPerson.name} is not found or may already be deleted! error: ${err}`
                    );
                    getNewPersons();
                });
        }
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
                destroy={() => destroy(filteredPerson)}
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
