
//team 1 Atlanta Falcons
//team 2 Buffalo Bills
//team 3 Chicago Bears
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

var event = $(".event");
var calendarDay = $(".calendar-day");
var calendarDate = $(".calendar-date");
var todayDate = dayjs().format("MMMM DD, YYYY");
//for comparing and displaying
var curMonth = dayjs().format('MMMM');
var curDay = dayjs().format('D');
var curYear = dayjs().format('YYYY');
var curWeekDay = dayjs().format('dddd');
//vars we may need when formating the month dates
var weekdays = [0, 1, 2, 3, 4, 5, 6];
var numOfDays = dayjs().daysInMonth(); // number of days in the month
var firstDayOfMonth = dayjs().startOf('month').$d;
var dateString = firstDayOfMonth.toLocaleDateString(); //how to get the weekday too? ex. Thursday, 12/1/2022
var firstWDofMonth = dayjs().startOf('month').day();
var paddingDays = weekdays[firstWDofMonth]; //how many black days we are going to have in beg of month

var calendar = document.querySelector('#calendar');


function displayDates() {
    //displays month and year at top of calendar
    var currentMonthYear = document.querySelector('#curr-month-year');
    currentMonthYear.textContent = curMonth + ' ' + curYear;
    //displays current weekday into box on side of calendar
    var todaysWeekday = document.querySelector('#curWeekday');
    todaysWeekday.textContent = curWeekDay;
    //displays todays date and month into box on side of calendar
    var curMonthDay = document.querySelector('#curMonthDay');
    curMonthDay.textContent = curMonth + ' ' + curDay;

    //function to compare the date number on the calendar to the current date and add class '.today'

    //how are we going to update the calendar dates???? and making sure it starts on correct weekday???? 
    for (let i = 1; i <= paddingDays + numOfDays; i++) { 
        var dayBlock = document.createElement('div');
        dayBlock.classList.add('calendar-day');
        var calDate = document.createElement('div');
        calDate.classList.add('calendar-date');
        
        if (i > paddingDays) {
            calDate.textContent = i - paddingDays; //supposed to add the date numbers... but is not 

            //add eventlistener to change the aside box view?
        } else {
            dayBlock.classList.add('inactive');
        }
        calendar.appendChild(dayBlock);
        dayBlock.appendChild(calDate);
         
    }

    
}

displayDates();



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
            }).then(function (data) {
                console.log(data); //returns the data from the team links
            })


    }


}
//getiss()



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
