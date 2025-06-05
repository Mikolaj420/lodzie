import React, { useState } from 'react';

function ReservationButton({ boatId, boatPrice, onReserved }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleReserve = () => {
    if (!startDate || !endDate) {
      setMessage('Uzupełnij daty rezerwacji.');
      return;
    }

    if (startDate >= endDate) {
      setMessage('Data końcowa musi być późniejsza niż początkowa.');
      return;
    }

    const token = localStorage.getItem('token');

    fetch('/reservations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        boat: boatId,
        date_from: `${startDate}T00:00:00`,
        date_to: `${endDate}T00:00:00`,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Błąd rezerwacji');
        return res.json();
      })
      .then(() => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const price = days * parseFloat(boatPrice);
  setMessage(`Zarezerwowano! Koszt: ${price.toFixed(2)} zł`);
  setStartDate('');
  setEndDate('');
  if (onReserved) onReserved();
})

      .catch((err) => setMessage(err.message));
  };

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <input
        type="date"
        min={today}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        min={startDate || today}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button onClick={handleReserve}>Zarezerwuj</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReservationButton;
