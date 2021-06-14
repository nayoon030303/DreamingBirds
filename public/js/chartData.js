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
    circleChart.classList.remove("none");
    timeChart.classList.remove("none");
    
   
}

function checkWeekly(){
    AlldisplayNone();

    circleChart.classList.remove("none");
    timeChart.classList.remove("none");

    date.innerText="dd";
}

function checkMontly(){
    AlldisplayNone();
    circleChart.classList.remove("none");
    timeChart.classList.remove("none");
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


function make_stimeChart(){
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn,i)=>{
        btn.addEventListener('click',checkUserClick);
    });



    checkUserClick();
     document.querySelector('.all-stime').innerText = ALL_STIME;
     document.querySelector('.max-contime').innerText = MAX_CONTIME ;
     document.querySelector('.max-subject').innerText = MAX_SUBJECT;
     document.querySelector('.min-subject').innerText = MIN_SUBJECT;
}



function chart_init(){



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

window.addEventListener('load',chart_init);