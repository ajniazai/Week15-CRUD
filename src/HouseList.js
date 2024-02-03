// src/components/HouseList.js
import React, { useState, useEffect } from 'react';
import House from './House';
import HouseForm from './HouseForm';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    // Fetch houses from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setHouses(data))
      .catch(error => console.error('Error fetching houses:', error));
  }, []);

  const handleSelectHouse = (house) => {
    setSelectedHouse(house);
  };

  const handleDeleteHouse = (houseId) => {
    // Delete a house from the API
    fetch(`https://jsonplaceholder.typicode.com/posts/${houseId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setHouses(prevHouses => prevHouses.filter(house => house.id !== houseId));
        setSelectedHouse(null);
      })
      .catch(error => console.error('Error deleting house:', error));
  };

  return (
    <div>
      <h2>Houses List</h2>
      <ul>
        {houses.map(house => (
          <House
            key={house.id}
            house={house}
            onSelect={() => handleSelectHouse(house)}
            onDelete={() => handleDeleteHouse(house.id)}
          />
        ))}
      </ul>
      <HouseForm
        selectedHouse={selectedHouse}
        setSelectedHouse={setSelectedHouse}
      />
    </div>
  );
};

export default HouseList;
 