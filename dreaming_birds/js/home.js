function MakeCalendar(){

    const date = new Date();

    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth+1}월`;

    //0을 전달하면, 지난달의 마지막 날의 Date객체가 생성된다.
    const prevLast = new Date(viewYear,viewMonth,0);
    const thisLast = new Date(viewYear, viewMonth+1,0);

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

    const dates = prevDates.concat(thisDates,nextDates);

    dates.forEach((date,i)=>{
        dates[i] = `<div class = "date">${date}</div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

   console.log(prevDates);
    
}

function paintCalendar(){
    const SUNDAY = 'sunday';
    const SATURDAY = 'saturday';
    const dates = document.querySelectorAll('.date');

    dates.forEach((date,i)=>{
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