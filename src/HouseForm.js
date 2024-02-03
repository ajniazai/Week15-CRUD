// src/components/HouseForm.js
import React, { useState, useEffect } from 'react';

const HouseForm = ({ selectedHouse, setSelectedHouse }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (selectedHouse) {
      setTitle(selectedHouse.title);
    } else {
      setTitle('');
    }
  }, [selectedHouse]);

  const handleSave = () => {
    if (selectedHouse) {
      // Update an existing house
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedHouse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedHouse.id,
          title: title,
        }),
      })
        .then(response => response.json())
        .then(updatedHouse => {
          setSelectedHouse(updatedHouse);
        })
        .catch(error => console.error('Error updating house:', error));
    } else {
      // Create a new house
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
        }),
      })
        .then(response => response.json())
        .then(newHouse => {
          setSelectedHouse(newHouse);
        })
        .catch(error => console.error('Error creating house:', error));
    }
  };

  return (
    <div>
      <h2>House Form</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>{selectedHouse ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default HouseForm;
 