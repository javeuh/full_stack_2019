import React from "react";

const Person = ({ person, number, destroy }) => {
    return (
        <li>
            <p>
                {person} {number}
                <button style={{ marginLeft: "10px" }} onClick={destroy}>
                    Delete
                </button>
            </p>
        </li>
    );
};

export default Person;
