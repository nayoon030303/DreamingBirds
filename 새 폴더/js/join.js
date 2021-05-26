function currentList(){
    const current_list = document.querySelector("#list_1");
    const CURRENT = 'current_css';
    current_list.classList.add(CURRENT);
}

function checkUserId(form){
    if(form.userId.value ==""){
        document.querySelector("#alert_id").innerHTML = "Please enter id";
        return false;
    }
    return true;
}

function checkUserPassword(form){
    if(form.userPassword.value ==""){
        document.querySelector("#alert_password").innerHTML = "Please enter password";
        return false;
    }
    return true;
}

function recheckUserPassword(form){
    if(form.userRepassword.value ==""){
        document.querySelector("#alert_repassword").innerHTML = "Please enter password";
        return false;
    }
    return true;
}

function checkUserName(form){
    if(form.userName.value ==""){
        document.querySelector("#alert_name").innerHTML = "Please enter name";
        return false;
    }
    return true;
}

function checkBirth(form){
    
}

function nextClick(){

    const form = document.join_form;
    const userId = checkUserId(form);
    const userPassword = checkUserPassword(form);
    const userRepassword = recheckUserPassword(form);
    const userName = checkUserName(form);
    const userBirth = checkBirth(form);

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