import React from "react";

const ContactList = ({ contactRows }) => {
    return (
        <div>
            <h3>Numbers</h3>
            <ul>{contactRows()}</ul>
        </div>
    );
};

export default ContactList;
