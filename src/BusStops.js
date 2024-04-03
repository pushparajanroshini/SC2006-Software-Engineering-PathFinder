const myHeaders = new Headers();
myHeaders.append("AccountKey", "Q1gFgfTJSg2kXIi4YQo+jw==");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://datamall2.mytransport.sg/ltaodataservice/BusStops", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  /*
  var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://datamall2.mytransport.sg/ltaodataservice/BusStops',
  'headers': {
    'AccountKey': 'Q1gFgfTJSg2kXIi4YQo+jw=='
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
*/