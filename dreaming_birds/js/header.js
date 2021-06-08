let header = document.getElementById('header');
header.style.width = '100%';
header.style.height = '60px';
header.style.backgroundColor = 'white';
header.style.position = 'fixed';
header.style.top = '0px';
header.style.right = '0px';
header.style.zIndex = '99';

let logo = document.createElement("img");
logo.setAttribute("src", "../img/dreamingBirds.png");
logo.className = 'logo';
logo.style.height = '70%';
logo.style.marginTop = '9px';
logo.style.marginLeft = '30px';
logo.style.float = 'left';
header.appendChild(logo);

let member = document.createElement("div");
member.className = 'member';
member.style.width = '42px';
member.style.height = '42px';
member.style.marginTop = '9px';
member.style.marginRight = '9px';
member.style.borderRadius = '50%';
member.style.overflow = 'hidden';
member.style.float = 'right';
header.appendChild(member);

let member_img = document.createElement("img");
member_img.className = 'member_img';
member_img.setAttribute("src", "../img/study/cam_ex.png");
member_img.style.height = '100%';
member.appendChild(member_img);