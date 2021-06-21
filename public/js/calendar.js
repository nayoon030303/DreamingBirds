const Day = document.querySelector('.day');
const month = document.querySelector('.month-name');
const date = new Date();

const pre = document.querySelector('.left');
const next = document.querySelector('.right');

const todoField = document.querySelector('.todo');
const todoTitle = document.querySelector('.todo-title');
const us = document.querySelector('.todoList');

const input = document.querySelector('input[type="text"]');
const add = document.querySelector('.add');
const reset = document.querySelector('.reset');
const allReset = document.querySelector('.allreset');

const calDate = document.querySelector('input[name="calDate"]');
const toDoList = document.querySelector('.js-toDoList');

//let user = $("#header").data("user");


let currentMon = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;

let year = currentYear;
let mon = currentMon;

let clickEventArr = [];
let storeToDo = [];
//let user = $(".js-toDoList").data("user");


function isLeapYear(year) {
    return (year % 4 == 0) && (year % 400 == 0 || year % 100 != 0);
}

function getDayOfMon(mon, year) {
    if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
        return 31;
    }
    else if (mon === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    else {
        return 30;
    }
}

function getDay(year, mon, date) {
    const conYMD = year + '-' + mon + '-' + date;
    return (new Date(conYMD).getDay());
}
function makeCalendar(year, mon, dayCount) {
    clickEventArr = [];
    Day.innerHTML = '';
    let getFirstDay = getDay(year, mon, 1);
    let previousMon;
    if (currentMon - 1 < 0) {
        previousMon = 12;
    }
    else {
        previousMon = currentMon - 1;
    }
    let getDayOfPreMon = getDayOfMon(previousMon, year);
    for (let i = (getFirstDay + 6) % 7 + 1; i > 0; i--) {
        const listPre = document.createElement('li');
        listPre.textContent = `${getDayOfPreMon - (i - 1)}`;
        listPre.style.opacity = '0.5';
        listPre.classList.add('disabled');
        Day.appendChild(listPre);
    }

    for (let i = 1; i <= dayCount; i++) {
        if (i === currentDay && year === currentYear && mon === currentMon) {
            //선택한 년, 월, 일 다를 때 현재 날짜에 검은색 테두리
            const onlyOneList = document.createElement('li');

            onlyOneList.textContent = `${i}`;
            if (currentYear === yearOfChoice && currentMon === MonOfChoice && currentDay === DayOfChoice) {
                onlyOneList.style.background = 'rgba(135, 165, 186, 0.726)';
            }
            else {
                onlyOneList.style.background = '#E8E8E8';
            }

            if (0 === getDay(year, mon, i)) {
                onlyOneList.style.color = 'red';
            }
            else if (6 == getDay(year, mon, i)) {
                onlyOneList.style.color = 'blue';
            }

            //현재 년, 월 같을 때

            Day.addEventListener('click', (event) => {
                if (event.target !== onlyOneList) {
                    onlyOneList.style.background = '#E8E8E8';
                }
            });

            Day.appendChild(onlyOneList);
            continue;
        }

        const list = document.createElement('li');
        list.textContent = `${i}`;
        if (i === DayOfChoice && year === yearOfChoice && mon === MonOfChoice) {
            list.style.background = '#283659';
            Day.addEventListener('click', (event) => {
                if (event.target !== list) {
                    list.style.background = 'white';
                }
            });
        }

        if (0 === getDay(year, mon, i)) {
            list.style.color = 'red';
        }
        else if (6 == getDay(year, mon, i)) {
            list.style.color = 'blue';
        }

        Day.appendChild(list);
    }
}

function setMonthTitle(year, mon) {
    month.textContent = `${year}.${mon}`
}

function nextMonthOrYear() {
    if (mon === 12) {
        year = year + 1;
        mon = 1;
    }
    else {
        mon = mon + 1;
    }
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
}

function preMonthOrYear() {
    if (mon === 1) {
        year = year - 1;
        mon = 12;
    }
    else {
        mon = mon - 1;
    }
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
}

function deleteToDo(event) {
    const btn = event.target;
    btn.style.background = "#87A5BA";
}

function loadToDos() {
    if (user.todos != null) {
        $(".js-toDoList").children().remove();
        for (let i = 0; i < user.todos.length; i++) {
            if (user.todos[i].date === todoTitle.textContent) {
                const li = document.createElement("li");
                const delBtn = document.createElement("button");
                const span = document.createElement("span");
                delBtn.style.background = "white";
                delBtn.addEventListener("click", deleteToDo);
                span.innerText = user.todos[i].content.replace("&nbsp;", " ");
                li.appendChild(delBtn);
                li.appendChild(span);
                toDoList.appendChild(li);
            }
        }
    }
}


function main() {
    // console.log(user);
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
    let dateText = `${year}.${mon}.${currentDay}`;
    todoTitle.textContent = `${year}.${mon}.${currentDay}`;
    document.todoForm.d.value = dateText;
    console.log(`==================`);
    loadToDos();
}


pre.addEventListener('click', preMonthOrYear);
next.addEventListener('click', nextMonthOrYear);


function clearEvent() {
    clickEventArr.forEach((value) => {
        value.style.background = 'white';
    });
}

Day.addEventListener('click', (event) => {
    if (event.target.tagName === 'UL') return;
    if (event.target.className !== 'disabled') {
        clearEvent();
        todoTitle.textContent = `${year}.${mon}.${event.target.textContent}`;
        event.target.style.background = 'rgba(135, 165, 186, 0.726)';
        DayOfChoice = (event.target.textContent) * 1;
        MonOfChoice = mon;
        yearOfChoice = year;

        document.todoForm.d.value = `${year}.${mon}.${event.target.textContent}`;
        loadToDos();
        clickEventArr.push(event.target);
        console.log(clickEventArr);
        input.focus();
    }

});


main();