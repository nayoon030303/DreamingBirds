
let subject_data = []
const select = document.querySelector('.select');
//let header = document.getElementById('header');

function getUserData(user){
   
    
    if(user.subjects != undefined){
        console.log(user.subjects);
        subject_data = user.subjects;
    }
}

function createSubject(){

    subject_data.forEach((data,i)=>{
        const a = document.createElement('a');
        const content = document.createElement('div');
        content.classList.add('content');
        a.classList.add('contentA');

        const name = document.createElement('span');
        name.innerText = data.name.replaceAll("&nbsp;", " ");
        name.classList.add('name');

        const time = document.createElement('span');
        //시간 정리 
        let data_t = data.time;

        let hour = Math.floor(data_t/3600);
        data_t = data_t%3600;
        let minute = Math.floor(data_t/60);
        let second = data_t%60; 

        //console.log(hour,minute,second);

        if(hour<10){
            hour = '0'+hour;
        }
        if(minute<10){
            minute = '0'+minute;
        }
        if(second<10){
            second = '0'+second;
        }


        time.innerText = `${hour}:${minute}:${second}`;
        time.classList.add('time');

        a.append(content);
        select.append(a);
        content.append(name);
        content.append(time);
    

        let user = $("#user-info").data("user");
        content.id = data._id;
        a.href = `/study/${user.id}?id=${content.id}`;
       

    })

}



function drawView(){
    //if(subject_data.length<=0){
    if(subject_data.length<=0){

        select.classList.add('nodata');
        select.classList.remove('select');

        const pleaseAdd = document.createElement('h1');
        pleaseAdd.innerText = '학습하실 과목을 추가해주세요';
        pleaseAdd.classList.add('add-title');

        const img = document.createElement('img');
        img.src = '../img/birds/chick.png';
        img.width = 230;
        img.classList.add('add-img');

        select.appendChild(pleaseAdd);
        select.appendChild(img);
        
    }else{
        select.classList.remove('nodata');
        select.classList.add('select');
        const title = document.querySelector('.title');
        const h1 = document.createElement('h1');
        h1.innerText = '어떤 과목을 학습하시겠습니까?'
        title.appendChild(h1);

        createSubject();
    }

}

function init(){
    const addBtn = document.querySelector('.add-btn');
    let user = $("#user-info").data("user");
    getUserData(user);
 
    addBtn.href = '/addSubject/'+user.id;
    drawView();

}

window.addEventListener('load',init);