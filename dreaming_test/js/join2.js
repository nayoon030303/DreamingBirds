function currentList(){
    const current_list = document.querySelector("#list_2");
    const CURRENT = 'current_css';
    current_list.classList.add(CURRENT);
}

function checkUserEmail(form){
    if(form.userEmail.value == ""){
        document.querySelector("#alert_email").innerHTML= "필수 정보입니다.";
        return false;
    }
    return true;
}

function checkuserEmailAddress(form){
    if(form.userEmailAddress.value == "직접입력"){
        document.querySelector("#alert_email").innerHTML= "선택해주세요.";
        return false;
    }
    return true;
}

function nextClick(){
    const form = document.join_form;
    const userEmailAddress = checkuserEmailAddress(form);
    const userEmail = checkUserEmail(form);

    if(userEmail&&userEmailAddress){
        document.querySelector("#alert_email").innerHTML= "";
    }
}


function init(){
    currentList(); 

    const nextBtn = document.querySelector("#nextButton");
    nextBtn.addEventListener("click",nextClick);
}

window.addEventListener("load",init);