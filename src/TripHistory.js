import React from 'react';
import './TripHistory.css';

const TripSummary = () => {
  return (
    <div className="trip-summary">
      <div className="trip-type">Bus $4.0</div>
      <div className="trip-type">MRT $6.0</div>
      <div className="trip-type">Taxi $24.0</div>
      <div className="trip-total">Total: $34.0</div>
    </div>
  );
};

const Trip = ({ tripId, date, from, to, duration, cost, status }) => {
  return (
    <div className="trip">
      <div className="trip-id">{tripId}</div>
      <div className="trip-date">{date}</div>
      <div className="trip-detail">
        {from} → {to} {duration} {cost}
      </div>
      <div className="trip-status">{status}</div>
      {status === 'Ongoing' && <button>Edit</button>}
    </div>
  );
};

const TripHistory = () => {
  // This would ideally come from a backend or state management system
  const trips = [
    {
      id: 'Trip 1',
      date: '24 Feb 2024',
      from: 'Test Avenue Street 11',
      to: 'Test Avenue Street 11',
      duration: '2 hr 0 min',
      cost: '$2.3',
      status: 'Ongoing',
    },
    // ... other trips
  ];

  return (
    <div className="trip-history">
      <TripSummary />
      {trips.map((trip) => (
        <Trip key={trip.id} {...trip} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <main>
        <TripHistory />
      </main>
    </div>
  );
};

export default App;
