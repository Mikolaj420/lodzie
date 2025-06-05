import React, { useEffect, useState } from 'react';

function AdminReservationList({ token }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/reservations/all/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error('Błąd pobierania rezerwacji:', err));
  }, [token]); // ✅ tylko token, bo fetch jest bezpośrednio tu

  const deleteReservation = (id) => {
    fetch(`http://127.0.0.1:8000/reservations/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.ok) {
          setReservations(prev => prev.filter(r => r.id !== id));
        } else {
          alert('Nie udało się usunąć rezerwacji');
        }
      });
  };

  return (
    <div>
      <h2>Wszystkie rezerwacje</h2>
      {reservations.length === 0 ? (
        <p>Brak rezerwacji.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              {res.boat_name} – od {new Date(res.date_from).toLocaleDateString()} do {new Date(res.date_to).toLocaleDateString()} (użytkownik: {res.username})
              <button onClick={() => deleteReservation(res.id)} style={{ marginLeft: '1rem' }}>🗑 Usuń</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminReservationList;
