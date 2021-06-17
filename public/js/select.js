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

function getDatas(){

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

        
    })


}

function drawView(){
    if(subject_data.length<=0){

    }else{
        getDatas();
    }

}

function init(){
    drawView();

}

window.addEventListener('load',init);