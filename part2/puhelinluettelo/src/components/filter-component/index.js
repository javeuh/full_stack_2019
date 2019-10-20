import React from "react";

const Filter = ({ handleSearch }) => (
    <div>
        Search contacts:{" "}
        <input onChange={handleSearch} placeholder="Search with name" />
    </div>
);

export default Filter;
