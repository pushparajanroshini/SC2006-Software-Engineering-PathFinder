const myHeaders = new Headers();
myHeaders.append("AccountKey", "Q1gFgfTJSg2kXIi4YQo+jw==");

function fetchBusArrival(busStopCode, busServiceNo) {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"  
    };

    return fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}`, requestOptions)
        .then((response) => response.json()) // Parse response as JSON
        .then((result) => {
            // Find the bus service with the given service number
            const service = result.Services.find(service => service.ServiceNo === busServiceNo);
            if (service) {
                // Extract arrival time of the next bus for the specific bus service and format it
                let arrivalTime = service.NextBus.EstimatedArrival;
                arrivalTime = arrivalTime.substring(11, 19); // Extract time part only
                return arrivalTime;
            } else {
                return null; // Return null if the bus service is not found at the bus stop
            }
        })
        .catch((error) => {
            console.error(error);
            return null; // Return null in case of any errors
        });
}

// Example usage: fetch bus arrival for bus stop code 83139 and bus service number 10
fetchBusArrival("27021", "199")
    .then((arrivalTime) => {
        if (arrivalTime !== null) {
            console.log(`${arrivalTime}`);
        } else {
            console.log("Bus service not found at bus stop");
        }
    });
