

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
var sidebarList = document.querySelector('.sidebar-list');
var calEvent;
var plusSign = document.querySelector(".plus-sign");


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
    $('.calendar-date').map(function () {
        if (dayjs().format('YYYY-MM-D') == $(this).attr('id')) {
            //console.log(dayjs().format('YYYY-MM-D'), $(this).attr('id'));
            $(this).addClass('today');

        }
    })

}
displayDates();


async function run(t) {
    var nflApi = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${t}/events?lang=en&region=us`

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
                // whats this?
                $('.calendar-date').map(function () {
                    if (a.textContent == $(this).attr('id')) {
                        console.log(a.textContent, $(this).attr('id'));
                        calEvent = document.createElement("p");
                        document.getElementById($(this).attr('id')).appendChild(calEvent);
                        calEvent.textContent = data.name + " " + times;
                        console.log(calEvent)
                    } else {
                    };
                })
            }
            )

    }
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

            for (var i = 0; i < holidayList.length; i++) {

                $('.calendar-date').map(function () {

                    if (holidayList[i] == $(this).attr('id')) {

                        var calEvent = document.createElement("p");
                        calDate.appendChild(calEvent);
                        calEvent.textContent = data.response.holidays[i].name

                    }
                })


            }




        })
}
// holidayData();

var Dd = document.querySelector("#Sd");
var test = document.querySelector(".Sportsdropdown")
// Listen for any clicks within the img-container div

Dd.addEventListener("click", function (event) {
    var element = event.target;
    //console.log(element)
    var t = element.getAttribute("id");
    run(t)
    console.log(t)

});  // drop downs arent on clicks they are on changes.

plusSign.addEventListener('click', addTodo);

// function addTodo() {
//     var addItem = document.querySelectorAll('.add-item');
//     //addItem.style = 'display: block';//need to figure out how to unhide
//     console.log(addItem);
    
// }




$(document).on('click', '.calendar-day', displayDay)
function displayDay(event) {
    // event.preventDefault();
    $('.sidebar-list').empty();
    // sidebarList.innerHTML = "";
    var whatsTheDay = $(this);
    console.log(whatsTheDay);

    curWeekday.innerHTML = dayjs($(this).children().attr("id")).format("dddd");
    curMonthDay.innerHTML = dayjs($(this).children().attr("id")).format("MMMM D");


    var dailyList = document.createElement("li");
    dailyList.classList.add("sidebar-list-item");
    sidebarList.appendChild(dailyList);
    dailyList.textContent = $(this)[0].children[0].children[0].textContent || "";
    // console.log($(this).children().children().innerHTML);
    // console.log(calEvent);

}




