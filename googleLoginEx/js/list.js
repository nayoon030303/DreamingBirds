function init(){
   const top = document.querySelector("#top");
   const title = document.createElement("h3");
   title.innerHTML = "회원가입";
   title.classList = "title";

   const list_div = document.createElement("div");
   list_div.id = "list_div";
   const ul = document.createElement("ul");
   ul.id = "list";
   
    let list = [
        '기본 정보<br>입력',
        '이메일<br>확인',
        '전화번호<br>확인',
        '회원가입<br>완료'
    ];

    for(let i=0; i<list.length; i++){
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.innerHTML = list[i];
        div.id = `list_${i+1}`;
        li.appendChild(div);
        ul.appendChild(li);
    }




   top.appendChild(title);
   list_div.appendChild(ul);
   top.appendChild(list_div);
}

window.addEventListener("load",init);