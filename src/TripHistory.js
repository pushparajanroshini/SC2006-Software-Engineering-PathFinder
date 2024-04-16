/*import React, { useState } from 'react';
import './TripHistory.css';

const MonthNavigator = () => {
  const [currentMonth, setCurrentMonth] = useState('Jan');

  // You could replace these with a dynamic calculation based on date objects if needed
  const previousMonth = () => {
    setCurrentMonth('Dec'); // replace with actual logic
  };

  const nextMonth = () => {
    setCurrentMonth('Feb'); // replace with actual logic
  };

  return (
    <div className="month-navigator">
      <button onClick={previousMonth}>{'<'}</button>
      <span>{currentMonth}</span>
      <button onClick={nextMonth}>{'>'}</button>
     // { You can also include the "press to see next month's record" text as needed }
    </div>
  );
};

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

const Trip = ({ name, date, from, to, duration, cost, status }) => {
  return (
    <div className="trip">
      <div className="trip-id">{name}</div>
      <div className="trip-date">{date}</div>
      <div className="trip-detail">
        {from} → {to} | {duration} | {cost}
      </div>
      <div className="trip-status">Status: {status}</div>
      {status === 'Ongoing' && <button>Edit</button>}
    </div>
  );
};

const TripHistory = () => {
  // This would ideally come from a backend or state management system
  const trips = [
    {
      id: '1',
      name: 'Trip 1',
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
      <MonthNavigator />
      <main>
        <TripHistory />
      </main>
    </div>
  );
};

export default App;*/
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './TripHistory.css';

const MonthNavigator = () => {
  const [currentMonth, setCurrentMonth] = useState('Jan');

  // You could replace these with a dynamic calculation based on date objects if needed
  const previousMonth = () => {
    setCurrentMonth('Dec'); // replace with actual logic
  };

  const nextMonth = () => {
    setCurrentMonth('Feb'); // replace with actual logic
  };

  return (
    <div className="month-navigator">
      <button onClick={previousMonth}>{'<'}</button>
      <span>{currentMonth}</span>
      <button onClick={nextMonth}>{'>'}</button>
      {/* You can also include the "press to see next month's record" text as needed */}
    </div>
  );
};

const TripSummary = ({ trips }) => {
  // Calculate total cost
  const totalCost = trips.reduce((acc, trip) => acc + parseFloat(trip.cost), 0);

  return (
    <div className="trip-summary">
      {trips.map((trip, index) => (
        <div key={index} className="trip-type">
          {trip.type} ${trip.cost}
        </div>
      ))}
      <div className="trip-total">Total: ${totalCost.toFixed(2)}</div>
    </div>
  );
};

const Trip = ({ trip }) => {
  return (
    <div className="trip">
      <div className="trip-date">{trip.date}</div>
      <div className="trip-detail">
        {trip.startAddress} → {trip.endAddress} | {trip.duration} | ${trip.fare}
      </div>
      <div className="trip-status">Status: {trip.status}</div>
      {trip.status === 'Ongoing' && <button>Edit</button>}
    </div>
  );
};

const TripHistory = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch trip data from Firebase Firestore
    const fetchTrips = async () => {
      const db = getFirestore(); // Get Firestore instance
      const tripRef = collection(db, 'trips'); // Reference to the 'trips' collection
      const querySnapshot = await getDocs(tripRef); // Get all documents from the 'trips' collection
      const tripData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Convert query snapshot to array of trip objects
      setTrips(tripData); // Set trips state with the retrieved data
    };

    fetchTrips(); // Call the fetchTrips function
  }, []);

  return (
    <div className="trip-history">
      <TripSummary trips={trips} /> {/* Display trip summary */}
      {trips.map((trip, index) => (
        <Trip key={index} trip={trip} /> // Display each trip
      ))}
    </div>
  );
};

export default TripHistory;
