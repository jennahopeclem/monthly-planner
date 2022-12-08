//team 1 Atlanta
//team 2 bills
//team 3 chicaggo bears
//team 4 Cincinnati Bengals
//team 5 Cleveland Browns
//team 6 Dallas Cowboys
//team 7 Denver Broncos
//team 8 Detroit Lions
//team 9 Green Bay Packers
//team 10 Tennessee Titans
//team 11 Indianapolis Colts
//team 12 Kansas City Chiefs
//team 13 Las Vegas Raiders
//team 14 Los Angeles Rams
//team 15 Miami Dolphins
//team 16 Minnesota Vikings
//team 17 New England Patriots
//team 18 New Orleans Saints
//team 19 New York Giants
//team 20 New York Jets
//team 21 Philadelphia Eagles
//team 22 Arizona Cardinals
//team 23 Pittsburgh Steelers
//team 24  Los Angeles Charger
//team 25 San Francisco 49ers
//team 26 Seattle Seahawks
//team 27 Tampa Bay Buccaneers
//team 28 Washington Commanders
//team 29 Carolina Panthers
//team 30 Jacksonville Jaguars



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

