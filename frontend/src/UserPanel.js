import React, { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';

const UserPanel = forwardRef(({ token }, ref) => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = useCallback(() => {
    fetch('http://127.0.0.1:8000/reservations/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error('Błąd pobierania rezerwacji:', err));
  }, [token]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  useImperativeHandle(ref, () => ({
    refreshReservations: fetchReservations
  }));

  const deleteReservation = (id) => {
    fetch(`http://127.0.0.1:8000/reservations/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setReservations(reservations.filter((r) => r.id !== id));
      }
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2>Twoje rezerwacje</h2>
      {reservations.length === 0 ? (
        <p>Brak rezerwacji.</p>
      ) : (
        <ul>
          {reservations.map((res) => {
            const dateFrom = new Date(res.date_from);
            const dateTo = new Date(res.date_to);
            const days = (dateTo - dateFrom) / (1000 * 60 * 60 * 24);
            const cost = (days * res.boat_price_per_day).toFixed(2);
            const dateFromStr = dateFrom.toLocaleDateString();
            const dateToStr = dateTo.toLocaleDateString();
            const dateFromISO = dateFrom.toISOString().split('T')[0];

            return (
              <li key={res.id}>
                {res.boat_name} – od {dateFromStr} do {dateToStr} (koszt: {cost} zł)
                {dateFromISO > today && (
                  <button onClick={() => deleteReservation(res.id)} style={{ marginLeft: '1rem' }}>
                    Usuń
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default UserPanel;
