

//https://calendarific.com/api/v2/holidays?&api_key=0f6f3c056e70ebca75cebdcc5cbbadf546e7c0c1&country=US&year=2022

function weatherData () {
    var weatherAPI = 'https://api.github.com/orgs/nodejs/repos';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
   } )

