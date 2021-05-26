function changeList(){
    const current_list = document.querySelector("#list_1");
    const CURRENT = 'current_css';
    current_list.classList.add(CURRENT);
}

function clickEvent(){
    console.log("클릭");
}

function init(){
    changeList();


    const nextBtn = document.querySelector("#nextButton");
    nextBtn.addEventListener("click",clickEvent);
}

window.addEventListener("load",init);