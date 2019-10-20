import React from "react";
import Country from "../country-component";

const CountryList = ({ countries, showCountry }) => {
    const errorMessage = countries[0].errorMessage;
    if (!!errorMessage) {
        return <p>{errorMessage}</p>;
    }
    const countryRows = () =>
        countries.map(country => (
            <p key={country.alpha3Code}>
                {country.name}
                <button onClick={() => showCountry([country])}>Show</button>
            </p>
        ));
    if (countries.length > 1) {
        return <div>{countryRows()}</div>;
    }
    return <Country country={countries[0]} />;
};
export default CountryList;
