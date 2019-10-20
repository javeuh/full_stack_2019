import React from "react";

const NewContactForm = ({ onSubmit, personName, personNumber, onChange }) => {
    return (
        <div>
            <h3>Add new contact</h3>
            <form onSubmit={onSubmit}>
                <div>
                    name:{" "}
                    <input
                        name="name"
                        value={personName}
                        onChange={onChange}
                        placeholder="Enter new name"
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        name="number"
                        value={personNumber}
                        onChange={onChange}
                        placeholder="Enter new number"
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default NewContactForm;
