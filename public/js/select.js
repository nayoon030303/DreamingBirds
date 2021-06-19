const subject_data = [{
    id:1,
    name:'커뮤니케이션 문학',
    time:'00:30:08'
},{
    id:2,
    name:'JavaScipt',
    time:'00:30:08'
},{
    id:3,
    name:'웹에 대한 이해',
    time:'00:30:08'
},{
    id:4,
    name:'어플리케이션 구축',
    time:'00:30:08'
},{
    id:5,
    name:'프로그래밍 수학',
    time:'00:30:08'
},{
    id:6,
    name:'C++',
    time:'00:30:08'
},{
    id:7,
    name:'Java',
    time:'00:30:08'
},{
    id:8,
    name:'Node.js',
    time:'00:30:08'
}]


const select = document.querySelector('.select');

function createSubject(){

    subject_data.forEach((data,i)=>{
        const content = document.createElement('div');
        content.classList.add('content');

        const name = document.createElement('span');
        name.innerText = data.name;
        name.classList.add('name');

        const time = document.createElement('span');
        time.innerText = data.time;
        time.classList.add('time');

        select.append(content);
        content.append(name);
        content.append(time);
        content.id = data.id;

        content.addEventListener('click',function(){clickSubject(event,content.id)});

    })

}


function clickSubject(event,id){
    //학습하기로 이동
    console.log('click Subject');
    console.log(id);
}



function clickAddBtn(event){
    //추가하기 페이지로 이동
   
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
    const xBtn = document.querySelector('.x-btnA');

    drawView();
    // addBtn.addEventListener('click',clickAddBtn);
    // xBtn.addEventListener('click',clickXBtn);
}

window.addEventListener('load',init);