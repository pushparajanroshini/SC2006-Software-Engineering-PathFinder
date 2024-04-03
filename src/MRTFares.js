const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');

// Read the CSV file and process the data
const faresData = [];
fs.createReadStream('FaresMRTLRT.csv')
  .pipe(csv())
  .on('data', (data) => {
    // Filter out rows where applicable_time is not "All other timings"
    if (data.fare_type === "Adult card fare" && data.applicable_time === "All other timings") {
      faresData.push(data);
    }
  })
  .on('end', () => {
    // Create a readline interface to prompt user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Function to calculate fare based on distance
    function calculateFare(distance) {
      // If distance is up to 3.2km, use the fare from the "Up to 3.2 km" column
      if (distance <= 3.2) {
        const upTo32Fare = faresData.find(fare => fare.distance === "Up to 3.2 km");
        if (upTo32Fare) {
          // Convert fare to dollars
          return parseFloat(upTo32Fare.fare_per_ride) / 100;
        }
      } else if (distance > 40.2) {
        // Special case: Distance over 40.2 km
        return 2.37;
      } else {
        // Loop through the fares data to find the matching fare
        for (const fare of faresData) {
          // Parse distance range from the CSV data
          const distanceRange = fare.distance;
          // Check if the distance range is in the expected format
          if (distanceRange && typeof distanceRange === 'string') {
            const rangeParts = distanceRange.split(" - ");
            // Check if the distance range has two parts
            if (rangeParts.length === 2) {
              const minDistance = parseFloat(rangeParts[0].replace(" km", ""));
              const maxDistance = parseFloat(rangeParts[1].replace(" km", ""));
              // Check if the entered distance falls within the range
              if (!isNaN(minDistance) && !isNaN(maxDistance) && distance >= minDistance && distance <= maxDistance) {
                // Convert fare to dollars
                return parseFloat(fare.fare_per_ride) / 100;
              }
            }
          }
        }
      }
      // Return null if no matching fare is found
      return null;
    }

    // Prompt the user to enter the distance of their journey
    rl.question('Enter the distance of your journey in km: ', (distance) => {
      // Convert distance to a float
      distance = parseFloat(distance);
      // Calculate the fare based on the distance entered
      const fare = calculateFare(distance);

      if (fare !== null) {
        console.log(`The fare for your journey of ${distance} km is $${fare.toFixed(2)}.`);
      } else {
        console.log('No fare found for the entered distance.');
      }
      // Close the readline interface after processing user input
      rl.close();
    });
  });
