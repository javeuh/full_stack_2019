import React from "react";

const Person = ({ person, number }) => {
    return (
        <li>
            <p>
                {person} {number}
            </p>
        </li>
    );
};

export default Person;
