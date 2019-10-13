import React from 'react';

const Total = ({courseParts}) => {
  const reducer = (acc, cur) => acc + cur.exercises;
  const total = courseParts.reduce(reducer, 0);
  return <p>In total <strong>{total}</strong> assignments</p>
}

export default Total;