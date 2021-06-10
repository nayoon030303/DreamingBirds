const OTHER = 'otherMonth';
const PREV = 'prev-date';
const NEXT = 'next-date;'
const CHECK = 'userCheck';

function MakeCalendar(){

    const date = new Date();
    const today = date.getDate();
  
    currentYear = date.getFullYear();
    currentMonth = date.getMonth()+1;
    currentDate = date.getDate();


    document.querySelector('.year-month').textContent = `${currentYear}년 ${currentMonth}월`;

    //0을 전달하면, 지난달의 마지막 날의 Date객체가 생성된다.
    const prevLast = new Date(currentYear,currentMonth-1,0);
    const thisLast = new Date(currentYear, currentMonth,0);
    
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
    const todayIndex = dates.indexOf(today);

    dates.forEach((date,i)=>{
        const isToday = i===todayIndex ? CHECK : 'no';
        const condition = i>=firstDateIndex && i<=lastDateIndex ? 'thisMonth':OTHER;
        let state ='null';
        if(i<firstDateIndex){
            state = PREV;
        }else if(i>lastDateIndex){
            state = NEXT;
        }
        dates[i] = `<div class = "date ${isToday} ${state}"><span class=${condition}>${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

    
}

function dateClick(event){

    const target = event.target;
    document.querySelector(`.${CHECK}`).classList.remove(CHECK);
    
    target.classList.add(CHECK);
    viewYear = currentYear;
    viewDate = target.innerText;

    if(target.classList.contains(PREV)){
        viewMonth=currentMonth-1;
    }else if(target.classList.contains(NEXT)){
        viewMonth=currentMonth+1;
    }else{
        viewMonth = currentMonth;
    }
   

    console.log(viewYear);
    console.log(viewMonth);
    console.log(viewDate);

   
}

function paintCalendar(){
    const SUNDAY = 'sunday';
    const SATURDAY = 'saturday';
    const dates = document.querySelectorAll('.date');

    dates.forEach((date,i)=>{
        dates[i].addEventListener('click',dateClick);
        if(i%7===0){
            dates[i].classList.add(SUNDAY);
        }else if(i%7===6){
            dates[i].classList.add(SATURDAY);
        }
    });
}

function home_init(){
    MakeCalendar();
    paintCalendar();
}

window.addEventListener('load',home_init);