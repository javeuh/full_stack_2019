import React from "react";

const Country = ({ country }) => {
    const imgAlt = "Flag of " + country.name;
    const getLanguages = () =>
        country.languages.map(language => (
            <li key={language.iso639_1}>{language.name}</li>
        ));
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages</h4>
            <ul>{getLanguages()}</ul>
            <img
                src={country.flag}
                alt={imgAlt}
                style={{ height: 8 + "rem" }}
            />
        </div>
    );
};

export default Country;
