import React, { useEffect, useState, useRef } from 'react';
import AddBoat from './AddBoat';
import ReservationButton from './ReservationButton';
import UserPanel from './UserPanel';
import AdminReservationList from './AdminReservationList';

function BoatList({ token }) {
  const [boats, setBoats] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const userPanelRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/boats/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setBoats(data))
      .catch(err => console.error('Błąd pobierania łodzi:', err));

    fetch('http://127.0.0.1:8000/api-auth/user/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => {
        if (user?.is_superuser) setIsAdmin(true);
      });
  }, [token]);

  const handleReservationMade = () => {
    if (userPanelRef.current) {
      userPanelRef.current.refreshReservations();
    }
  };

  const deleteBoat = (id) => {
    fetch(`http://127.0.0.1:8000/boats/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.ok) setBoats(boats.filter(b => b.id !== id));
        else alert('Nie udało się usunąć łodzi');
      });
  };

  return (
    <div>
      <h2>Lista łodzi</h2>
      <ul>
        {boats.map((boat) => (
          <li key={boat.id} style={{ marginBottom: '1rem' }}>
            <strong>{boat.name}</strong> – {boat.description}<br />
            Lokalizacja: {boat.location}<br />
            Typ: {boat.boat_type}<br />
            Cena za dobę: {boat.price_per_hour} zł<br />
            {boat.image_url && (
              <img src={boat.image_url} alt="łódź" width={200} />
            )}
            {!isAdmin && (
              <ReservationButton
                boatId={boat.id}
                boatPrice={boat.price_per_hour}
                onReserved={handleReservationMade}
              />
            )}
            {isAdmin && (
              <button onClick={() => deleteBoat(boat.id)}>🗑 Usuń łódź</button>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && <AddBoat onBoatAdded={(newBoat) => setBoats([...boats, newBoat])} />}

      {isAdmin ? (
        <AdminReservationList token={token} />
      ) : (
        <UserPanel ref={userPanelRef} token={token} />
      )}
    </div>
  );
}

export default BoatList;
