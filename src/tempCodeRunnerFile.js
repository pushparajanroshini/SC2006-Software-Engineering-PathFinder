const myHeaders = new Headers();
myHeaders.append("AccountKey", "Q1gFgfTJSg2kXIi4YQo+jw==");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://datamall2.mytransport.sg/ltaodataservice/BusRoutes", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

