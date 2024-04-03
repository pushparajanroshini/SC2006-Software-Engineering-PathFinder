/*
import React, { useState, useEffect } from 'react';

function BusArrivalTime({ busStopCode }) {
  const [busArrivalData, setBusArrivalData] = useState(null);

  useEffect(() => {
    const fetchBusArrivalData = async () => {
      try {
        const response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`, requestOptions);
        const data = await response.json();
        setBusArrivalData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusArrivalData();
  }, [busStopCode]); // Add busStopCode as a dependency to useEffect

  return (
    <div>
      <h2>Bus Arrival Time for Bus Stop Code {busStopCode}</h2>
      {busArrivalData && (
        <div>
          {busArrivalData.Services.map((service, index) => (
            <div key={index}>
              <h3>Service No: {service.ServiceNo}</h3>
              <p>Operator: {service.Operator}</p>
              {// Display other relevant information }
              </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    export default BusArrivalTime;
    
    */
// javascript fetch
const myHeaders = new Headers();
myHeaders.append("AccountKey", "Q1gFgfTJSg2kXIi4YQo+jw==");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=83139", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

