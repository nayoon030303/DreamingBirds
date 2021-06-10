const ALL_STIME = '11:30';
const MAX_CONTIME = '02:23';
const MAX_SUBJECT = '수학';
const MIN_SUBJECT = '국어';



function make_stimeChart(){
     document.querySelector('.all-stime').innerText = ALL_STIME;
     document.querySelector('.max-contime').innerText = MAX_CONTIME ;
     document.querySelector('.max-subject').innerText = MAX_SUBJECT;
     document.querySelector('.min-subject').innerText = MIN_SUBJECT;
}



function chart_init(){
    make_stimeChart();

}

window.addEventListener('load',chart_init);