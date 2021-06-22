const OTHER = 'otherMonth';
const PREV = 'prev-date';
const NEXT = 'next-date;'
const CHECK_DATE = 'userCheck';
const CURRENT_DATES = 'current_dates';
const userName = user.nickname;
const CHECK_FILTER = 'userClickFilter';


function MakeCalendar(year,month,date){

    viewYear = year;
    viewMonth = month;
    viewDate = date;
  
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth}월`;

    //0을 전달하면, 지난달의 마지막 날의 Date객체가 생성된다.
    const prevLast = new Date(viewYear,viewMonth-1,0);
    const thisLast = new Date(viewYear, viewMonth,0);
    
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    //key()메서드는 배열의 각 인덱스를 키 값으로 가지는 새로운 Array Iteraot 객체를 반환
    //
    const thisDates = [...Array(TLDate+1).keys()].slice(1);
    const nextDates = [];

    if(PLDate !== 6){//토요일이 아니라면
        for(let i=0; i<PLDay+1; i++){
            prevDates.unshift(PLDate-i);
        }
    }
    for(let i=1; i<7-TLDay; i++){
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates,nextDates);//배열 붙이기
    const firstDateIndex = dates.indexOf(1); //1이 시작 index
    const lastDateIndex = dates.lastIndexOf(TLDate); //마지막날의 index
    //const todayIndex = dates.indexOf(today);

    dates.forEach((date,i)=>{
        const condition = i>=firstDateIndex && i<=lastDateIndex ? 'thisMonth':OTHER;
        let state = CURRENT_DATES;
        if(i<firstDateIndex){
            state = PREV;
        }else if(i>lastDateIndex){
            state = NEXT;
        }
        dates[i] = `<div class = "date  ${state}"><span class=${condition}>${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

    ChangekDate(viewYear,viewMonth,viewDate);
    paintCalendar();
    
}

function ChangekDate(year,month,date){
    if(date<10){
        date = '0'+date;
    }
    let userClickDate = `<h2 class="user_">${year}.${month}.${date} ${userName}님의 학습 통계 입니다.</h2>`
    document.querySelector('.write-date').innerHTML = userClickDate;
}

function checkCorrectkDate(){

    viewDate = 1;
    if(viewMonth<1){
        viewYear-=1;
        viewMonth = 12;
        viewDate = 1;
    }else if(viewMonth>12){
        viewYear+=1;
        viewMonth = 1;
        viewDate = 1;
    }

    MakeCalendar(viewYear,viewMonth,viewDate);
     
}


function paintDate(){
    const dates = document.querySelectorAll('.date');

    dates.forEach((date,i)=>{
        if(date == target || date.firstChild == target){
            date.classList.add(CHECK_DATE);
        }
    });
}

function clickDate(event){

    let prev_target = document.querySelector(`.${CHECK_DATE}`);
    let isPrev = !prev_target.classList.contains(CURRENT_DATES);
    prev_target.classList.remove(CHECK_DATE);
    
    
    
    target = event.target;
    viewDate = target.innerText;
    paintDate();



    if(target.classList.contains(CURRENT_DATES) === isPrev){ //이전 선택과 지금 선택의 class가 다른 경우
        if(target.classList.contains(PREV) && prev_target.classList.contains(CURRENT_DATES)){
            viewMonth-=1;
        }else if(target.classList.contains(CURRENT_DATES) && prev_target.classList.contains(NEXT)){
            viewMonth-=1;
        }else if(target.classList.contains(CURRENT_DATES) && prev_target.classList.contains(PREV)){
            viewMonth+=1;
        }else if(target.classList.contains(NEXT) && prev_target.classList.contains(CURRENT_DATES)){
            viewMonth+=1;
        } 
    }else if(target.classList.contains(NEXT) && prev_target.classList.contains(PREV)){
        viewMonth+=2;
    }else if(target.classList.contains(PREV) && prev_target.classList.contains(NEXT)){
        viewMonth-=2;
    }
   
   
    ChangekDate(viewYear,viewMonth,viewDate);

}

function clickLeftBtn(event){
    viewMonth-=1;
    checkCorrectkDate();
    initDate(viewDate);
    paintDate();
}

function clickRightBtn(event){
    viewMonth+=1;
    checkCorrectkDate();
    initDate(viewDate);
    paintDate();
}


function paintCalendar(){
    const SUNDAY = 'sunday';
    const SATURDAY = 'saturday';
    const dates = document.querySelectorAll('.date');

    dates.forEach((date,i)=>{
        dates[i].addEventListener('click',clickDate);
        
        if(i%7===0){
            dates[i].classList.add(SUNDAY);
        }else if(i%7===6){
            dates[i].classList.add(SATURDAY);
        }
    });
}

function initDate(number){
    let initdates = document.querySelectorAll(`.${CURRENT_DATES}`);
    initdates.forEach((d,i)=>{
        if(i+1 == number){
            d.classList.add(CHECK_DATE);
        }
    });
}

function clickToday(event){
     
    MakeCalendar(currentYear,currentMonth,currentDate);
    initDate(currentDate);
}
function clickFilter(event){
    document.querySelector(`.${CHECK_FILTER}`).classList.remove(CHECK_FILTER);
    event.target.classList.add(CHECK_FILTER);
}

/**
 * 통계
 */
const ALL_STIME = '11:30';
const MAX_CONTIME = '02:23';
const MAX_SUBJECT = '수학';
const MIN_SUBJECT = '국어';

const CHECK_USER = 'userClickFilter';
const WRITE_DATE = 'write-date';

const descibe = document.querySelector(".chart");
const circleChart = document.querySelector('.circle-chart');
const timeChart = document.querySelector('.time-chart');
const date = document.querySelector('.write-date');

function isCheck(data){
    return data.classList.contains(CHECK_USER);
}

function AlldisplayNone(){
    const elements = document.querySelectorAll(".element");
    elements.forEach((element,i)=>{
        element.classList.add('none');
    })
}


function checkDaily(){
    AlldisplayNone();

    descibe.classList.remove("none");
    //circleChart.classList.remove("none");
    timeChart.classList.remove("none");
    
    const user_ = document.querySelector('.user_');
    user_.innerText=`${viewYear}.${viewMonth}.${viewDate} ${userName}님의 학습통계 입니다.`;
}

function checkWeekly(){
    AlldisplayNone();

    circleChart.classList.remove("none");
    timeChart.classList.remove("none");

    const user_ = document.querySelector('.user_');
    user_.innerText=`${viewYear}.${viewMonth} ${userName}님의 학습통계 입니다.`;
}

function checkMontly(){
    AlldisplayNone();
    circleChart.classList.remove("none");
    timeChart.classList.remove("none");

    const user_ = document.querySelector('.user_');
    user_.innerText=`${viewYear} ${userName}님의 학습통계 입니다.`;
}

function checkUserClick(){
    const daily = document.querySelector('.daily');
    const weekly = document.querySelector('.weekly');
    const montly = document.querySelector('.montly');
    
    if(isCheck(daily)){
        checkDaily();
    }else if(isCheck(weekly)){
        checkWeekly();

    }else if(isCheck(montly)){
        checkMontly();
    }
    
}


//1 study타임 통계 
function make_stimeChart(){
    //총 학습시간
    let view = `${viewYear}. ${viewMonth}. ${viewDate}.`;
    console.log(view);
    let timer = user.timer;
    let totalTime = '00:00:00';
   
    timer.forEach((t)=>{
        console.log(t.date);
        console.log(view);
        if(t.date == view){
            totalTime = `${String(t.hour).padStart(2,'0')}.${String(t.min).padStart(2,'0')}.${String(t.sec).padStart(2,'0')}`;
            
        } 
    });
    document.querySelector('.all-stime').innerText = totalTime;

    //최대 집중 시간
    document.querySelector('.max-contime').innerText = MAX_CONTIME ;


    //
    

    let maxConcentrateTime = '학습을 시작하지 않았습니다.'; //최다 학습 과목
    let minConcentrateTime = '학습을 시작하지 않았습니다.'; //최저 학습 과목
    let t_subject = [];
    let timesum = 0;
    let subjects = user.subjects;
    subjects.forEach((subject)=>{ //name과 time만 추출
        if(subject.date == view){
            timesum+=subject.time;
            t_subject.push({
                name: subject.name,
                time: subject.time
            });
        }
    });

    t_subject.sort((a,b)=>{ //내림차순
        if(a.time>b.time){
            return -1;
        }else{
            return 1;
        }
    });
    maxConcentrateTime = t_subject[0].name;
    minConcentrateTime = t_subject[t_subject.length-1].name;
    document.querySelector('.max-subject').innerText = maxConcentrateTime;
    document.querySelector('.min-subject').innerText = minConcentrateTime;

    console.log(user.subjects);

    //과목별 공부량
    
    //비율 만들기
    t_subject.forEach((data)=>{
        if(timesum == 0) {
            createRate(data.name, 0);
        } else {
            createRate(data.name,data.time/timesum*100);
        }
    })
    console.log();
    
    
}

let stimeGraph = document.querySelector('.stime-graph');

function createRate(name, rate)
{   
   
    let bar = document.createElement('div');
    bar.classList.add('zt-skill-bar');
    let data = document.createElement('div');

    if(rate<10){
        data.dataset.width = `10`;
    }else{
        data.dataset.width = `${rate}`;
    }
    data.innerText = name;
    let ratio = document.createElement('span');
    ratio.innerText = `${rate}%`;

    data.append(ratio);
    bar.append(data);
    stimeGraph.append(bar);
    console.log(bar);
}


//2 study타임 경고 비율
function make_wraningchart(){

}

//3 타임라인
function make_timeline(){

}



function chart_init(){

    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn,i)=>{
        btn.addEventListener('click',checkUserClick);
    });

    checkUserClick();

    make_stimeChart();
    (function( $ ) {
        "use strict";
        $(function() {
            function animated_contents() {
                $(".zt-skill-bar > div ").each(function (i) {
                    var $this  = $(this),
                        skills = $this.data('width');
    
                    $this.css({'width' : skills + '%'});
    
                });
            }
            
            if(jQuery().appear) {
                $('.zt-skill-bar').appear().on('appear', function() {
                    animated_contents();
                });
            } else {
                animated_contents();
            }
        });
    }(jQuery));
}

function home_init(){
    const date = new Date();   
    currentYear = date.getFullYear();
    currentMonth = date.getMonth()+1;
    currentDate = date.getDate();
    MakeCalendar(currentYear,currentMonth,currentDate);
    initDate(currentDate);

    document.querySelector('.left-btn').addEventListener('click',clickLeftBtn);
    document.querySelector('.right-btn').addEventListener('click',clickRightBtn);
    document.querySelector('.today-btn').addEventListener('click',clickToday);

    document.querySelectorAll('.filter-btn').forEach((d,i)=>{
        d.addEventListener('click',clickFilter);
    })

    chart_init();
}






window.addEventListener('load',home_init);

 