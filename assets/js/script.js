

const nflApi = 'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/1/events?lang=en&region=us'
async function getiss() {
    const response = await fetch(nflApi);
    const data = await response.json();
    const { items } = data;


    for (var i = 0; i < items.length; i++) {
        var team = items[i];
        

        fetch(team.$ref)
        .then(function (response) {
            // console.log(team.$ref); //console logs the team links
            // console.log(response);
            return response.json();
        }) .then(function(data) {
            const { date } = data;
            console.log(date); //returns the data from the team links
        
        })}
     


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