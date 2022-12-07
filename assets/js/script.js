

const nflApi = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32'
async function getiss() {
    const response = await fetch(nflApi);
    const data =  await response.json();
    const { items} = data;

    console.log(items);




}
getiss()

function weatherData() {
    var weatherAPI = 'https://calendarific.com/api/v2/holidays?&api_key=0f6f3c056e70ebca75cebdcc5cbbadf546e7c0c1&country=US&year=2022&type=national';

    fetch(weatherAPI)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

weatherData();