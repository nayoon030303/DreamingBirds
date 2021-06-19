const datas =['Java','사회','국어',
'영어','c#','건축학개론','기술과 가정','정보 보안']

function createRecommend(){

    const subjects = document.querySelector('.r-subjects');
    datas.forEach((data)=>{
        const item = document.createElement('div');
        item.innerText = data;
        item.classList.add('item');
        item.addEventListener("click",function(){clickSubject(event,data)});
        subjects.appendChild(item);
    })
}

function clickSubject(event,data){
    
    const input = document.querySelector('.input-direct');
    input.value = data;
    checkInput();
}

function checkInput(){
    const next_btn = document.querySelector('.c-btn');
    const input = document.querySelector('.input-direct');

    if(input.value!=''){
        next_btn.classList.remove('noclear-btn');
        next_btn.classList.add('clear-btn');
    }else{
        next_btn.classList.add('noclear-btn');
        next_btn.classList.remove('clear-btn');
    }

}



function init(){
    createRecommend();
    const input = document.querySelector('.input-direct');
    const xbtn = document.querySelector('.x-btn');
    const backbtn = document.querySelector('.back-btn');

    input.addEventListener('keyup', checkInput);
    
}

window.addEventListener('load',init);