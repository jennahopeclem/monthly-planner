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
var c = dayjs().format("YYYY-MM-DD")
var todayDate = dayjs().format("MMMM DD, YYYY");
//for comparing and displaying
var curMonth = dayjs().format('MMMM');
var curMonthNumber = dayjs().format('MM')
var curDay = dayjs().format('D');
var curYear = dayjs().format('YYYY');
var curWeekDay = dayjs().format('dddd');
//vars we need when formating the month dates
var firstDayOfMonth = dayjs().startOf('month').$d;
var weekdays = [0, 1, 2, 3, 4, 5, 6]; //used to determine padding days
var numOfDays = dayjs().daysInMonth(); // number of days in the month
var firstWDofMonth = dayjs().startOf('month').day();
var paddingDays = weekdays[firstWDofMonth]; //how many black days we are going to have in beg of month
var calDate;
var dayBlock;
var dayNumber;
var holidayList = [];
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
    for (let i = 1; i <= paddingDays + numOfDays; i++) {
        dayBlock = document.createElement('div');
        dayBlock.classList.add('calendar-day');
        calDate = document.createElement('div');
        calDate.classList.add('calendar-date');
        if (i > paddingDays) {
            calDate.textContent = i - paddingDays;
            calDate.setAttribute('id', curYear + "-" + curMonthNumber + "-" + calDate.textContent);
            //add eventlistener to change the aside box view?
        } else {
            dayBlock.classList.add('inactive');
            calDate.setAttribute('id', 'n/a')
        }
        calendar.appendChild(dayBlock);
        dayBlock.appendChild(calDate);
    }
    //applies different color to today's date
    var dateElements = document.querySelectorAll('.calendar-date');
    dateElements.forEach(function (dateElement) {
        if (dateElement.id == dayjs().format('YYYY-MM-D')) {
            dateElement.classList.add('today');
        }
    });
}
displayDates();


function run(t) {
    var nflApi = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${t}/events?lang=en&region=us`
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
                    //console.log(data);
                    var a = $("<p1>");
                    var dates = data.date.split("T")[0];
                    var times = data.date.split("T")[1].split("Z")[0];
                    a.textContent = dates;

                    var dateElements = document.querySelectorAll('.calendar-date');
                    dateElements.forEach(function (dateElement) {
                        if (a.textContent == dateElement.id) {
                            //console.log(a.textContent, dateElement.id);
                            var calEvent = document.createElement("p");
                            document.getElementById(dateElement.id).appendChild(calEvent);
                            calEvent.textContent = data.name + " " + times;
                            //console.log(calEvent);
                        } else {
                        }
                    });
                });
        }
    }
    getiss()
}

function holidayData() {
    var holidayAPI = 'https://calendarific.com/api/v2/holidays?&api_key=a650bf2c0b0cdf1c919ef9a9cef5fba2a18c8ef1&country=US&year=2022&type=national';
    fetch(holidayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)
            for (var i = 0; i < data.response.holidays.length; i++) {
                let holidayInfo = {
                    date: dayjs(data.response.holidays[i].date.iso).format("YYYY-MM-D"),
                    name: data.response.holidays[i].name
                }
                //if holiday date is same as calendar date, display holiday
                var dateElements = document.querySelectorAll('.calendar-date');
                dateElements.forEach(function (dateElement) {
                    if (holidayInfo.date == dateElement.id) {
                        // console.log(holidayInfo.date, dateElement.id);
                        var calEvent = document.createElement("p");
                        //calDate.appendChild(calEvent) was calling the final most calDate. This looks up the specific calDate by id rather than call the last made.
                        document.getElementById(dateElement.id).appendChild(calEvent);
                        calEvent.textContent = holidayInfo.name;
                    }
                });
            }
        });
}
//holidayData();

var Dd = document.querySelector("#Sd");
var test = document.querySelector(".Sportsdropdown")
// Listen for any clicks within the img-container div

Dd.addEventListener("click", function (event) {
    var element = event.target;
    //console.log(element)
    var t = element.getAttribute("id");
    run(t)
    //console.log(t)
});

$(document).on('click', '.calendar-day', displayDay);
function displayDay(event) {
    // event.preventDefault();
    //$('.sidebar-list').empty();

    curWeekday.innerHTML = dayjs($(this).children().attr('id')).format('dddd');
    curMonthDay.innerHTML = dayjs($(this).children().attr('id')).format('MMMM D');

    if ($(this).children().children().innerContent == '') {
        console.log('cool');
    } else {
        var whatsInTheBox = $(this)[0].children[0].children[0].textContent //|| "";
        console.log(whatsInTheBox); // it is telling us what game is in that date box, but it is not displaying on sidebar
        var whatsTheDay = $(this); //giving us the each date's block
        console.log(whatsTheDay);

        var dailyList = document.createElement('li');
        dailyList.textContent = whatsInTheBox;

        $('.sidebar-list').appendChild(dailyList);
        // dailyList.classList.add('sidebar-list-item');

    }
}

