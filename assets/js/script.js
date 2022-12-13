
var c = dayjs().format("YYYY-MM-DD")
var todayDate = dayjs().format("MMMM DD, YYYY");
var calDate;
var dayBlock;
var dayNumber;
var holidayList = [];
var calEvent;
var sideDate;
var todoItemArray = [];

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

//connected to HTML
var calendar = document.querySelector('#calendar');
var sidebarList = document.querySelector('.sidebar-list');
var plusSign = document.querySelector(".plus-sign");
var saveTodo = document.querySelector("#save-todo");
var currentMonthYear = document.querySelector('#curr-month-year');
var todaysWeekday = document.querySelector('#curWeekday');
var curMonthDay = document.querySelector('#curMonthDay');
var todoItem = document.querySelector("#todo-item");
var dropDown = document.querySelector("#sportslist");
var test = document.querySelector(".Sportsdropdown");

// drop downs arent on clicks they are on changes.
$(document).on('click', '.calendar-day', displayDay)
saveTodo.addEventListener("click", saveEvent)

function init() {
    displayDates();
    loadLocalStorage()
    //holidayData();
}
init()

function displayDates() {
    //displays month and year at top of calendar
    currentMonthYear.textContent = curMonth + ' ' + curYear;
    //displays current weekday into box on side of calendar
    todaysWeekday.textContent = curWeekDay;
    //displays todays date and month into box on side of calendar
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
            $(this).addClass('today');

        }
    })

}

function loadLocalStorage() {
    sideDate = curYear + "-" + dayjs(curMonthDay.textContent).format("MM-DD")
    todoItemEl = document.createElement("p");
    todoItemEl.textContent = todoItem.value

    document.getElementById(sideDate).appendChild(todoItemEl)
    todoItemEl.textContent = localStorage.getItem(sideDate)
}

function displayDay(event) {
    // event.preventDefault();
    $('.sidebar-list').empty();

    curWeekday.innerHTML = dayjs($(this).children().attr("id")).format("dddd");
    curMonthDay.innerHTML = dayjs($(this).children().attr("id")).format("MMMM D");

    var dailyList = document.createElement("li");
    dailyList.classList.add("sidebar-list-item");
    sidebarList.appendChild(dailyList);
    dailyList.textContent = $(this)[0].children[0].children[0].textContent || "";
}

async function run(team) {
    var nflApi = `https://cors-anywhere.herokuapp.com/https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/teams/${team}/events?lang=en&region=us`

    const response = await fetch(nflApi);
    const data = await response.json();
    const { items } = data;
    for (var i = 0; i < items.length; i++) {
        var team = items[i];
        fetch(team.$ref)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                var gameDay = $("<p1>");
                var dates = data.date.split("T")[0];
                var times = data.date.split("T")[1].split("Z")[0];
                gameDay.textContent = dates;
                $('.calendar-date').map(function () {
                    if (gameDay.textContent == $(this).attr('id')) {
                        calEvent = document.createElement("p");
                        document.getElementById($(this).attr('id')).appendChild(calEvent);
                        calEvent.textContent = data.name + " " + times;
                        var currentlyInStorageAtThisTime = localStorage.getItem($(this).attr('id')) || ""
                        var stringToAdd = currentlyInStorageAtThisTime + "\n" + data.name;
                        localStorage.setItem($(this).attr('id'), stringToAdd)
                    } else {
                    };
                })
            }
            )
    }
}

// Listen for any clicks within the img-container div
dropDown.addEventListener("click", function (event) {
    var element = event.target;
    var team = element.getAttribute("id");
    run(team)

});

function holidayData() {
    var holidayAPI = 'https://calendarific.com/api/v2/holidays?&api_key=a650bf2c0b0cdf1c919ef9a9cef5fba2a18c8ef1&country=US&year=2022&type=national';

    fetch(holidayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.response.holidays.length; i++) {
                let holidayInfo = {
                    date: dayjs(data.response.holidays[i].date.iso).format("YYYY-MM-D"),
                    name: data.response.holidays[i].name
                }
                //if holiday date is same as calendar date, display holiday
                var dateElements = document.querySelectorAll('.calendar-date');
                dateElements.forEach(function (dateElement) {
                    if (holidayInfo.date == dateElement.id) {
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

function saveEvent() {
    sideDate = curYear + "-" + dayjs(curMonthDay.textContent).format("MM-DD")

    todoItemEl = document.createElement("p");
    todoItemEl.textContent = todoItem.value

    document.getElementById(sideDate).appendChild(todoItemEl)

    todoItemArray.push(todoItem.value)
    localStorage.setItem(sideDate, todoItemArray)
}