function currentList(){
    const current_list = document.querySelector("#list_1");
    const CURRENT = 'current_css';
    current_list.classList.add(CURRENT);
}

function checkUserId(form){
    if(form.userId.value ==""){
        document.querySelector("#alert_id").innerHTML = "필수 정보입니다.";
        return false;
    }
    return true;
}

function checkUserPassword(form){
    if(form.userPassword.value ==""){
        document.querySelector("#alert_password").innerHTML = "필수 정보입니다.";
        return false;
    }
    return true;
}

function recheckUserPassword(form){
    if(form.userRepassword.value ==""){
        document.querySelector("#alert_repassword").innerHTML = "필수 정보입니다.";
        return false;
    }
    return true;
}

function checkUserName(form){
    if(form.userName.value ==""){
        document.querySelector("#alert_name").innerHTML = "필수 정보입니다.";
        return false;
    }
    return true;
}

function checkuserYear(form){
    if(form.userYear.value ==""){
        document.querySelector("#alert_birth").innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        return false
    }
    return true;
}

function checkuserMonth(form){
    console.log(form.userMonth.value);
    if(form.userMonth.value =="월"){
        document.querySelector("#alert_birth").innerHTML = "태어난 월을 선택하세요.";
        return false
    }
    return true;
}

function checkuserDay(form){
    
    if(form.userDay.value =="일"){
        document.querySelector("#alert_birth").innerHTML = "태어난 일(날짜) 을 선택하세요.";;
        return false
    }
    return true;
}
 
function nextClick(){

    

    const form = document.join_form;
    const userId = checkUserId(form);
    const userPassword = checkUserPassword(form);
    const userRepassword = recheckUserPassword(form);
    const userName = checkUserName(form);
    const userDay = checkuserDay(form);
    const userMonth = checkuserMonth(form);
    const userYear = checkuserYear(form);
   

    if(userId){
        document.querySelector("#alert_id").innerHTML = "";
    }
    if(userPassword){
        document.querySelector("#alert_password").innerHTML = "";
    }
    if(userRepassword){
        document.querySelector("#alert_repassword").innerHTML = "";
    }
    if(userName){
        document.querySelector("#alert_name").innerHTML = "";
    }
    if(userYear && userMonth && userDay){
        document.querySelector("#alert_birth").innerHTML = "";
    }
    

}

function init(){
    currentList();

    const month = document.querySelector("#month");
    for(let i=1; i<=12; i++){
        let option = document.createElement('option');
        option.innerText = i;
        month.append(option);
    }

    const day = document.querySelector("#day");
    for(let i=1; i<=31; i++){
        let option = document.createElement('option');
        option.innerText = i;
        day.append(option);
    }




    const nextBtn = document.querySelector("#nextButton");
    nextBtn.addEventListener("click",nextClick);
}

window.addEventListener("load",init);