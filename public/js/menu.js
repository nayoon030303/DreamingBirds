class MenuContent {
    constructor(name, src, link) {
        this.name = name;
        this.src = src;
        this.link = link;
    }
}

let menu = document.getElementById("menu");
menu.style.width = '15%';
menu.style.backgroundColor = '#F9F9F9';
menu.style.padding = '1% 1.5%';

let nav = document.createElement("nav");
// nav.style.border = '1px solid red';
nav.style.display = 'flex';
nav.style.flexDirection = 'column';
nav.style.justifyContent = 'space-between';
nav.style.position = 'fixed';
nav.style.width = '15%';
menu.appendChild(nav);

let contents = [];
contents.push(new MenuContent(user.nickname.replaceAll("&nbsp;", " "), user.profile_src, ('/my/' + user.id)));
contents.push(new MenuContent('소개', '../img/icon/intro.png', '/'));
contents.push(new MenuContent('홈', '../img/icon/home.png', '/home'));
<<<<<<< Updated upstream
contents.push(new MenuContent('스터디', '../img/icon/book.png', '/study'));
contents.push(new MenuContent('체크리스트', '../img/icon/checklist.png', '#'));
=======
contents.push(new MenuContent('체크리스트', '../img/icon/checklist.png', '/checklist/'+user.id));
>>>>>>> Stashed changes

for (let i = 0; i < contents.length; i++) {
    let menu_content = document.createElement("div");
    menu_content.style.width = '100%';
    menu_content.style.height = '30px';
    menu_content.style.color = '#4B4B4B';
    // menu_content.style.border = '1px solid blue';
    menu_content.style.padding = '5% 0';
    menu_content.className = "menu_content";

    let link = document.createElement("a");
    link.className = "menu_link";
    link.style.color = "black";
    link.style.textDecoration = "none";
    link.href = contents[i].link;

    let menu_img = document.createElement("img");
    menu_img.className = "menu_img";
    menu_img.setAttribute("src", contents[i].src);
    menu_img.style.float = 'left';
    if (i == 0) {
        menu_img.style.borderRadius = '50%';
    }
    // menu_img.style.border = '1px solid green';
    menu_img.style.height = '30px';
    menu_img.style.width = '30px';
    menu_img.style.objectFit = 'cover';
    link.appendChild(menu_img);


    let menu_name = document.createElement("div");
    menu_name.className = "menu_name";
    menu_name.textContent = contents[i].name;
    menu_name.style.display = 'flex';
    menu_name.style.alignItems = 'center';
    menu_name.style.height = '100%';
    menu_name.style.marginLeft = '25%';
    link.appendChild(menu_name);

    menu_content.appendChild(link);

    nav.appendChild(menu_content);
}