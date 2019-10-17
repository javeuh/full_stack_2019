import React from "react";

const Part = ({ courseParts }) =>
    courseParts.map(coursePart => {
        return (
            <p key={coursePart.id}>
                {coursePart.name} {coursePart.exercises}
            </p>
        );
    });

export default Part;
