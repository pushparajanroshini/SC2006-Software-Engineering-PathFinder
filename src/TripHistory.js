// /*import React, { useState } from 'react';
// import './TripHistory.css';

// const MonthNavigator = () => {
//   const [currentMonth, setCurrentMonth] = useState('Jan');

//   // You could replace these with a dynamic calculation based on date objects if needed
//   const previousMonth = () => {
//     setCurrentMonth('Dec'); // replace with actual logic
//   };

//   const nextMonth = () => {
//     setCurrentMonth('Feb'); // replace with actual logic
//   };

//   return (
//     <div className="month-navigator">
//       <button onClick={previousMonth}>{'<'}</button>
//       <span>{currentMonth}</span>
//       <button onClick={nextMonth}>{'>'}</button>
//      // { You can also include the "press to see next month's record" text as needed }
//     </div>
//   );
// };

// const TripSummary = () => {
//   return (
//     <div className="trip-summary">
//       <div className="trip-type">Bus $4.0</div>
//       <div className="trip-type">MRT $6.0</div>
//       <div className="trip-type">Taxi $24.0</div>
//       <div className="trip-total">Total: $34.0</div>
//     </div>
//   );
// };

// const Trip = ({ name, date, from, to, duration, cost, status }) => {
//   return (
//     <div className="trip">
//       <div className="trip-id">{name}</div>
//       <div className="trip-date">{date}</div>
//       <div className="trip-detail">
//         {from} → {to} | {duration} | {cost}
//       </div>
//       <div className="trip-status">Status: {status}</div>
//       {status === 'Ongoing' && <button>Edit</button>}
//     </div>
//   );
// };

// const TripHistory = () => {
//   // This would ideally come from a backend or state management system
//   const trips = [
//     {
//       id: '1',
//       name: 'Trip 1',
//       date: '24 Feb 2024',
//       from: 'Test Avenue Street 11',
//       to: 'Test Avenue Street 11',
//       duration: '2 hr 0 min',
//       cost: '$2.3',
//       status: 'Ongoing',
//     },
//     // ... other trips
//   ];

//   return (
//     <div className="trip-history">
//       <TripSummary />
//       {trips.map((trip) => (
//         <Trip key={trip.id} {...trip} />
//       ))}

//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <MonthNavigator />
//       <main>
//         <TripHistory />
//       </main>
//     </div>
//   );
// };

// export default App;*/
// import React, { useState, useEffect } from 'react';
// import { getFirestore, collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
// import './TripHistory.css';

// const MonthNavigator = () => {
//   const [currentMonth, setCurrentMonth] = useState('Jan');

//   // You could replace these with a dynamic calculation based on date objects if needed
//   const previousMonth = () => {
//     setCurrentMonth('Dec'); // replace with actual logic
//   };

//   const nextMonth = () => {
//     setCurrentMonth('Feb'); // replace with actual logic
//   };

//   return (
//     <div className="month-navigator">
//       <button onClick={previousMonth}>{'<'}</button>
//       <span>{currentMonth}</span>
//       <button onClick={nextMonth}>{'>'}</button>
//       {/* You can also include the "press to see next month's record" text as needed */}
//     </div>
//   );
// };

// const TripSummary = ({ trips }) => {
//   // Calculate total cost
//   const totalCost = trips.reduce((acc, trip) => acc + parseFloat(trip.cost), 0);

//   return (
//     <div className="trip-summary">
//       {trips.map((trip, index) => (
//         <div key={index} className="trip-type">
//           {trip.type} ${trip.cost}
//         </div>
//       ))}
//       <div className="trip-total">Total: ${totalCost.toFixed(2)}</div>
//     </div>
//   );
// };

// const Trip = ({ trip, onUpdateStatus }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(trip.status || 'Ongoing'); // Initialize with trip status or default to 'Ongoing'

//   const handleStatusUpdate = async () => {
//     setShowDropdown(false);
//     onUpdateStatus(trip.id, selectedStatus);
//   };

//   return (
//     <div className="trip">
//       <div className="trip-date">{trip.date}</div>
//       <div className="trip-detail">
//         {trip.startAddress} → {trip.endAddress} | {trip.duration} | ${trip.cost}
//       </div>
//       <div className="trip-status">
//         Status: {selectedStatus} <button onClick={() => setShowDropdown(true)}>Update</button>
//         {showDropdown && (
//           <div className="dropdown">
//             <button onClick={() => setSelectedStatus('Ongoing')}>Ongoing</button>
//             <button onClick={() => setSelectedStatus('Completed')}>Completed</button>
//             <button onClick={handleStatusUpdate}>Save</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const TripHistory = () => {
//   const [trips, setTrips] = useState([]);
//   const [newTripType, setNewTripType] = useState('');
//   const [newTripCost, setNewTripCost] = useState('');

//   useEffect(() => {
//     // Fetch trip data from Firebase Firestore
//     const fetchTrips = async () => {
//       const db = getFirestore(); // Get Firestore instance
//       const tripRef = collection(db, 'trips'); // Reference to the 'trips' collection
//       const querySnapshot = await getDocs(tripRef); // Get all documents from the 'trips' collection
//       const tripData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Convert query snapshot to array of trip objects
//       setTrips(tripData); // Set trips state with the retrieved data
//     };

//     fetchTrips(); // Call the fetchTrips function
//   }, []);

//   const handleAddTrip = async () => {
//     const db = getFirestore(); // Get Firestore instance
//     const tripRef = collection(db, 'trips'); // Reference to the 'trips' collection
//     await addDoc(tripRef, { type: newTripType, cost: newTripCost, status: 'Ongoing' }); // Add new trip to Firestore with default status 'Ongoing'
//     setNewTripType(''); // Clear input field after adding trip
//     setNewTripCost(''); // Clear input field after adding trip
//     const newTripData = { type: newTripType, cost: newTripCost, status: 'Ongoing' }; // Create new trip data object
//     setTrips(prevTrips => [...prevTrips, newTripData]); // Add new trip to local state with default status 'Ongoing'
//   };

//   const handleUpdateStatus = async (tripId, newStatus) => {
//     const db = getFirestore(); // Get Firestore instance
//     const tripDocRef = doc(db, 'trips', tripId); // Reference to the specific trip document
//     await updateDoc(tripDocRef, { status: newStatus }); // Update the status of the trip document
//     setTrips(prevTrips =>
//       prevTrips.map(trip => (trip.id === tripId ? { ...trip, status: newStatus } : trip))
//     ); // Update the status locally
//   };

//   return (
//     <div className="trip-history">
//       <div className="add-trip-form">
//         <input
//           type="text"
//           placeholder="Type"
//           value={newTripType}
//           onChange={e => setNewTripType(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Cost"
//           value={newTripCost}
//           onChange={e => setNewTripCost(e.target.value)}
//         />
//         <button onClick={handleAddTrip}>Add Trip</button>
//       </div>
//       <TripSummary trips={trips} /> {/* Display trip summary */}
//       {trips.map((trip, index) => (
//         <Trip key={index} trip={trip} onUpdateStatus={handleUpdateStatus} /> // Display each trip
//       ))}
//     </div>
//   );
// };

// export default TripHistory;




import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import './TripHistory.css';

const MonthNavigator = () => {
  const [currentMonth, setCurrentMonth] = useState('Jan');

  const previousMonth = () => {
    setCurrentMonth('Dec');
  };

  const nextMonth = () => {
    setCurrentMonth('Feb');
  };

  return (
    <div className="month-navigator">
      <button onClick={previousMonth}>{'<'}</button>
      <span>{currentMonth}</span>
      <button onClick={nextMonth}>{'>'}</button>
    </div>
  );
};

// const TripSummary = ({ trips }) => {
//   const totalCost = trips.reduce((acc, trip) => acc + parseFloat(trip.cost), 0);

//   return (
//     <div className="trip-summary">
//       {trips.map((trip, index) => (
//         <div key={index} className="trip-type">
//           {trip.type} ${trip.cost}
//         </div>
//       ))}
//       <div className="trip-total">Total: ${totalCost.toFixed(2)}</div>
//     </div>
//   );
// };
const TripSummary = ({ trips }) => {
  const totals = trips.reduce((acc, trip) => {
    if (trip.transitRoutes && trip.transitRoutes.fare) {
      acc.transitTotal += parseFloat(trip.transitRoutes.fare);
    }
    if (trip.taxi && trip.taxi.fare) {
      acc.taxiTotal += parseFloat(trip.taxi.fare);
    }
    return acc;
  }, { transitTotal: 0, taxiTotal: 0 });

  const overallTotal = totals.transitTotal + totals.taxiTotal; // Calculate the overall total

  return (
    <div className="trip-summary">
      <div className="trip-total">Total Transit Fare: ${totals.transitTotal.toFixed(2)}</div>
      <div className="trip-total">Total Taxi Fare: ${totals.taxiTotal.toFixed(2)}</div>
      <div className="trip-total">Overall Total Fare: ${overallTotal.toFixed(2)}</div> {/* Display the overall total */}
    </div>
  );
};



// const Trip = ({ trip, onUpdateStatus }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(trip.status || 'Ongoing');

//   const handleStatusUpdate = async () => {
//     setShowDropdown(false);
//     onUpdateStatus(trip.id, selectedStatus);
//   };

//   // Example of checking if data is available and is a number
//   const formatFare = (fare) => fare && typeof fare === 'number' ? fare.toFixed(2) : 'N/A';

//   return (
//     <div className="trip">
//       <div className="trip-date">{trip.date}</div>
//       <div className="trip-detail">
//         {trip.startAddress} → {trip.endAddress} |
//         <br />
//         Transit: {trip.transitDuration || 'N/A'} min - ${formatFare(trip.transitFare)}
//         <br />
//         Taxi: {trip.taxiDuration || 'N/A'} - ${formatFare(trip.taxiFare)}
//       </div>
//       <div className="trip-status">
//         Status: {selectedStatus} <button onClick={() => setShowDropdown(true)}>Update</button>
//         {showDropdown && (
//           <div className="dropdown">
//             <button onClick={() => setSelectedStatus('Ongoing')}>Ongoing</button>
//             <button onClick={() => setSelectedStatus('Completed')}>Completed</button>
//             <button onClick={handleStatusUpdate}>Save</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const Trip = ({ trip, onUpdateStatus }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(trip.status || 'Ongoing');

  const handleStatusUpdate = async () => {
    setShowDropdown(false);
    onUpdateStatus(trip.id, selectedStatus);
  };

  //const formatFare = (fare) => fare && typeof fare === 'number' ? fare.toFixed(2) : 'N/A';

  return (
    <div className="trip">
      <div className="trip-date">{trip.date}</div>
      <div className="trip-detail">
        {trip.startAddress} → {trip.endAddress}
        {trip.transitRoutes && (
          <>
            <br />
            Transit: {trip.transitRoutes.duration} min - ${trip.transitRoutes.fare}
          </>
        )}
        {trip.taxi && (
          <>
            <br />
            Taxi: {trip.taxi.duration} - ${trip.taxi.fare}
          </>
        )}
      </div>
      <div className="trip-status">
        Status: {selectedStatus} <button onClick={() => setShowDropdown(true)}>Update</button>
        {showDropdown && (
          <div className="dropdown">
            <button onClick={() => setSelectedStatus('Ongoing')}>Ongoing</button>
            <button onClick={() => setSelectedStatus('Completed')}>Completed</button>
            <button onClick={handleStatusUpdate}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};


const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [newTripType, setNewTripType] = useState('');
  const [newTripCost, setNewTripCost] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      const db = getFirestore();
      const tripRef = collection(db, 'trips');
      const querySnapshot = await getDocs(tripRef);
      const tripData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(tripData);
    };

    fetchTrips();
  }, []);

  const handleAddTrip = async () => {
    if (trips.length >= 5) {
      // Limit the number of trips to 5
      alert('You can only add up to 5 trips.');
      return;
    }

    const db = getFirestore();
    const tripRef = collection(db, 'trips');
    await addDoc(tripRef, { type: newTripType, cost: newTripCost, status: 'Ongoing' });
    setNewTripType('');
    setNewTripCost('');
    const newTripData = { type: newTripType, cost: newTripCost, status: 'Ongoing' };
    setTrips(prevTrips => [...prevTrips, newTripData]);
  };

  const handleUpdateStatus = async (tripId, newStatus) => {
    const db = getFirestore();
    const tripDocRef = doc(db, 'trips', tripId);
    await updateDoc(tripDocRef, { status: newStatus });
    setTrips(prevTrips =>
      prevTrips.map(trip => (trip.id === tripId ? { ...trip, status: newStatus } : trip))
    );
  };

  const handleReset = () => {
    setTrips([]);
  };

//   return (
//     <div className="trip-history">
//       <div className="add-trip-form">
//         <input
//           type="text"
//           placeholder="Type"
//           value={newTripType}
//           onChange={e => setNewTripType(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Cost"
//           value={newTripCost}
//           onChange={e => setNewTripCost(e.target.value)}
//         />
//         <button onClick={handleAddTrip}>Add Trip</button>
//         <button onClick={handleReset}>Reset</button> {/* Add reset button */}
//       </div>
//       <TripSummary trips={trips} />
//       {trips.map((trip, index) => (
//         <Trip key={index} trip={trip} onUpdateStatus={handleUpdateStatus} />
//       ))}
//     </div>
//   );
// };

return (
  <div className="trip-history">
    <TripSummary trips={trips} />
    {trips.map((trip, index) => (
      <Trip key={index} trip={trip} onUpdateStatus={handleUpdateStatus} />
    //<button onClick={handleReset}>Reset</button> {/* Add reset button */}

    ))}
  </div>
);
};

export default TripHistory;
