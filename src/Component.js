import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import PromptLocationPermission from './promptLocationPermission.js';
import LocationComponent from './promptLocationPermission.js';

const RoutePlanner = () => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filterOption, setFilterOption] = useState('fastest'); // Default filter option
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [startCoordinates, setStartCoordinates] = useState(null); // Declare startCoordinates state
  const [endCoordinates, setEndCoordinates] = useState(null); // Declare startCoordinates state
  const [authorizationToken, setAuthorizationToken] = useState('');
  const [cookie, setCookie] = useState('');
  const [currentAddress, setCurrentAddress] = useState(null); // State for building name

  //const currentDate = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore', month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  //const currentTime = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/:/g, '');

  useEffect(() => {
    if (routes.length > 0) {
      // Apply filter on routes when routes state updates
      filterRoutes();
    }
  }, [routes, filterOption]);

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      fetchLocationDetails(location.latitude, location.longitude);
    }
  }, [location]);
  
  useEffect(() => {
    if (currentAddress) {
      setStartAddress(currentAddress);
    }
  }, [currentAddress]);
  
  
//Fetch location details
const fetchLocationDetails = (latitude, longitude) => {
  axios.post('https://www.onemap.gov.sg/api/auth/post/getToken', {
    email: "YONG0257@e.ntu.edu.sg",
    password: "Sc2006sc2006"
  })
  .then(response => {
    const authorizationToken = response.data.access_token;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", authorizationToken); // Use the fetched authorization token
    myHeaders.append("Cookie", "_toffsuid=rB8E8GYadhQiED8MBsoLAg==");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://www.onemap.gov.sg/api/public/revgeocode?location=${latitude},${longitude}&buffer=50&addressType=All&otherFeatures=N`, requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => {
      if (result.GeocodeInfo && result.GeocodeInfo.length > 0) { // Check if GeocodeInfo exists and is not empty
        const firstEntry = result.GeocodeInfo[0];
        const buildingName = firstEntry.BUILDINGNAME !== 'NIL' ? firstEntry.BUILDINGNAME : '';
        const block = firstEntry.BLOCK !== 'NIL' ? firstEntry.BLOCK : '';
        const road = firstEntry.ROAD !== 'NIL' ? firstEntry.ROAD : '';
        const currentAddress = [buildingName, block, road].join(' ').trim();
        setCurrentAddress(currentAddress); // Update the currentAddress state
        setStartAddress(currentAddress); // Update the startAddress state
      } else {
        console.error('GeocodeInfo is empty or undefined.');
      }
    })
    .catch((error) => console.error(error));
  })
  .catch(error => {
    console.error('Error fetching authorization token:', error);
  });
};



  const handleFetchRoutes = () => {
    axios.post('https://www.onemap.gov.sg/api/auth/post/getToken', {
      email: "YONG0257@e.ntu.edu.sg",
      password: "Sc2006sc2006"
    })
    .then(response => {
      const authorizationToken = response.data.access_token;
      
      fetchPTData(authorizationToken, startAddress, endAddress, date, time);

    })
    .catch(error => {
      console.error('Error fetching authorization token:', error);
    });
  };
  //FetchPTData

  const fetchPTData = (authorizationToken, startAddress, endAddress, date, time) => {
    const requestOptions = {
      headers: {
        Authorization: authorizationToken,
        Cookie: "_toffsuid=rB8E8GYL5xNLXUnGBoCUAg=="
      }
    };

    const startUrl = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(startAddress)}&returnGeom=Y&getAddrDetails=Y`;
    const endUrl = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(endAddress)}&returnGeom=Y&getAddrDetails=Y`;

    const startDataPromise = axios.get(startUrl, requestOptions);
    const endDataPromise = axios.get(endUrl, requestOptions);

    Promise.all([startDataPromise, endDataPromise])
// Inside the Promise.all block of fetchPTData function
.then(([startResponse, endResponse]) => {
  const startResult = startResponse.data.results[0];
  const endResult = endResponse.data.results[0];

  // Extract postal codes from start and end results
  const startPostal = parseInt(startResult.POSTAL);
  const endPostal = parseInt(endResult.POSTAL);

  // Set start and end coordinates
  const startCoordinates = {
    latitude: parseFloat(startResult.LATITUDE),
    longitude: parseFloat(startResult.LONGITUDE),
    postal: startPostal
  };
  const endCoordinates = {
    latitude: parseFloat(endResult.LATITUDE),
    longitude: parseFloat(endResult.LONGITUDE),
    postal: endPostal
  };
  
  // Update state with coordinates
  setStartCoordinates(startCoordinates);
  setEndCoordinates(endCoordinates);

  const routeUrl = `https://www.onemap.gov.sg/api/public/routingsvc/route?start=${startCoordinates.latitude},${startCoordinates.longitude}&end=${endCoordinates.latitude},${endCoordinates.longitude}&routeType=pt&date=08-08-2024&time=100000&mode=TRANSIT&numItineraries=2`;

  return axios.get(routeUrl, requestOptions);
})

      .then(routeResponse => {
        const result = routeResponse.data;

        if (result.plan && result.plan.itineraries) {
          // Sorting itineraries based on duration (fastest route first)
          result.plan.itineraries.sort((a, b) => a.duration - b.duration);

          // Sorting itineraries based on fare (cheapest route first)
          result.plan.itineraries.sort((a, b) => a.fare - b.fare);

          setRoutes(result.plan.itineraries);
        } else {
          console.log("No itineraries found.");
          setRoutes([]);
        }
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
      });
  };
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };
  const filterRoutes = () => {
    if (filterOption === 'fastest') {
      // Sort routes by duration in ascending order
      const sortedRoutes = [...routes].sort((a, b) => a.duration - b.duration);
      setFilteredRoutes(sortedRoutes);
    } else if (filterOption === 'cheapest') {
      // Sort routes by fare in descending order
      const sortedRoutes = [...routes].sort((a, b) => a.fare - b.fare);
      setFilteredRoutes(sortedRoutes);
    }
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0'); // Zero-padded hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Zero-padded minutes
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Zero-padded seconds
    return `${hours}:${minutes}:${seconds}`; // Return the formatted time
  };


  return (
    <div className="route-planner">
      <PromptLocationPermission setLocation={setLocation} />
      {location && <p>Current Location: {currentAddress}</p>};
      
      
      <div className="map-background">
        {startCoordinates && endCoordinates ? (
          <iframe
            src={`https://www.onemap.gov.sg/amm/amm.html?mapStyle=Default&zoomLevel=15&marker=postalcode:${startCoordinates.postal}!colour:red!rType:TRANSIT!rDest:${startCoordinates.latitude},${startCoordinates.longitude}&marker=postalcode:${endCoordinates.postal}!colour:red!rType:TRANSIT!rDest:${endCoordinates.latitude},${endCoordinates.longitude}&popupWidth=200`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            src="https://www.onemap.gov.sg/amm/amm.html?mapStyle=Default&zoomLevel=15&popupWidth=200"
            scrolling="no"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <input
        type="text"
        placeholder="Start Address"
        value={currentAddress}
        onChange={(e) => setStartAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Address"
        value={endAddress}
        onChange={(e) => setEndAddress(e.target.value)}
      />
     
      <button onClick={handleFetchRoutes}>Get Routes</button>
  
      {/* Filter options */}
      <div className="filter-options">
        <label>
          <input
            type="radio"
            value="fastest"
            checked={filterOption === 'fastest'}
            onChange={handleFilterChange}
          />
          Fastest Route
        </label>
        <label>
          <input
            type="radio"
            value="cheapest"
            checked={filterOption === 'cheapest'}
            onChange={handleFilterChange}
          />
          Cheapest Route
        </label>
      </div>
  
      <div className="routes">
        {filteredRoutes.map((route, index) => (
          <div key={index} className="itinerary">
            <p><strong>Route {index + 1}</strong></p>
            <p><strong>Duration (minutes):</strong> {Math.round(route.duration / 60)}</p>
            <p><strong>Fare:</strong> {route.fare}</p>
            {/* Display legs information */}
            <div className="legs">
              {route.legs.map((leg, legIndex) => (
                <div key={legIndex}>
                  <p><strong>Leg {legIndex + 1}:</strong></p>
                  <p><strong>Mode:</strong> {leg.mode}</p>
                  <p><strong>Bus Number / MRT Line:</strong> {leg.route || "N/A"}</p>
                  <p><strong>From:</strong> {leg.from.name}</p>
                  {leg.mode === "BUS" && (
                    <p><strong>Next Bus Arrival Time:</strong> {formatTime(leg.from.arrival)}</p>
                  )}
                  <p><strong>To:</strong> {leg.to.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default RoutePlanner;