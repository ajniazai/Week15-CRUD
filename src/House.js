// src/components/House.js
import React from 'react';

const House = ({ house, onSelect, onDelete }) => {
  return (
    <li>
      {house.title}
      <button onClick={onSelect}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default House;
