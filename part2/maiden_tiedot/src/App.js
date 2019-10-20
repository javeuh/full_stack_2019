import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter-component";
import CountryList from "./components/country-list-component";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([
        { errorMessage: "Search for something..." }
    ]);
    let keyPress = null;

    useEffect(() => {
        if (!!searchTerm.length) {
            axios
                .get("https://restcountries.eu/rest/v2/name/" + searchTerm)
                .then(response => {
                    if (response.data.length <= 10) {
                        setCountries(response.data);
                    } else {
                        setCountries([
                            { errorMessage: "Too many search results!" }
                        ]);
                    }
                });
        } else {
            setCountries([{ errorMessage: "Search for something..." }]);
        }
    }, [searchTerm]);

    const showCountry = countryToShow => {
        setCountries(countryToShow);
    };

    const handleSearch = event => {
        const searchInput = event.target.value;
        //timeout just for waiting more user input and not conducting the search right away
        clearTimeout(keyPress);
        keyPress = setTimeout(() => {
            setSearchTerm(searchInput);
        }, 500);
    };

    return (
        <div>
            <Filter handleSearch={handleSearch} />
            <CountryList countries={countries} showCountry={showCountry} />
        </div>
    );
}

export default App;
