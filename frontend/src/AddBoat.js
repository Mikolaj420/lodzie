import React, { useState } from 'react';

function AddBoat({ onBoatAdded }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [boatType, setBoatType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch('/boats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        location,
        boat_type: boatType,
        price_per_hour: price,
        description,
        image_url: imageUrl,
        available: true,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się dodać łodzi.');
        return res.json();
      })
      .then((data) => {
        setName('');
        setLocation('');
        setBoatType('');
        setPrice('');
        setDescription('');
        setImageUrl('');
        setError('');
        onBoatAdded(data);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj łódź</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Nazwa" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Lokalizacja" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Typ łodzi" value={boatType} onChange={(e) => setBoatType(e.target.value)} required />
      <input type="number" placeholder="Cena za dobę" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Opis (opcjonalnie)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="url" placeholder="URL obrazka (opcjonalnie)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddBoat;
