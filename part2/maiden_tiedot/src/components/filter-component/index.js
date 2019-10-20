import React from "react";

const Filter = ({ handleSearch }) => (
    <div>
        Search country:
        <input onChange={handleSearch} placeholder="Search with name" />
    </div>
);

export default Filter;
