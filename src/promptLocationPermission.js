import React, { useState, useEffect } from 'react';

function LocationComponent() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
            },
            () => {
                setError('Unable to retrieve your location.');
            }
        );
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            {location && <p>Location: {location}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default LocationComponent;