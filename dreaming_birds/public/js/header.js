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
member_img.style.width = '42px';
member_img.style.height = '42px';
member_img.style.objectFit = 'cover';
member.appendChild(member_img);

let member_info = document.createElement("div");
member_info.className = "member_info";
member_info.style.border = '1px solid #CFCFCF';
member_info.style.background = '#FBFBFB';
member_info.style.color = "#6A6A6A";
member_info.style.position = "absolute";
member_info.style.top = "60px";
member_info.style.right = "15px";
member_info.style.width = "200px";
member_info.style.display = "none";
member_info.style.textAlign = "center";
member_info.style.fontSize = "15px";
header.appendChild(member_info);

let member_profile = document.createElement("img");
member_profile.className = "member_profile";
member_profile.setAttribute("src", "../img/study/cam_ex.png");
member_profile.style.borderRadius = '50%';
member_profile.style.height = '80px';
member_profile.style.width = '80px';
member_profile.style.objectFit = 'cover';
member_profile.style.marginTop = "30px";
member_profile.style.border = "1px solid #CFCFCF";
member_info.appendChild(member_profile);

let member_name = document.createElement("p");
member_name.className = "member_name";
member_name.textContent = "김이름";
member_name.style.borderBottom = "1px solid #CFCFCF";
member_name.style.paddingBottom = "20px";
member_info.appendChild(member_name);

let member_email_title = document.createElement("p");
member_email_title.className = "member_email_title";
member_email_title.textContent = "이메일";
member_email_title.style.textAlign = "left";
member_email_title.style.marginLeft = "15px";
member_info.appendChild(member_email_title);

let member_email = document.createElement("p");
member_email.className = "member_email";
member_email.textContent = "s2019s09@e-mirim.hs.kr";
member_email.style.width = "200px";
member_email.style.fontSize = "15px";
member_email.style.marginBottom = "20px";
member_info.appendChild(member_email);



$(document).ready(function () {
    $("html").on("click", function (e) {
        if ($(e.target).hasClass("member_img")) {
            if (member_info.style.display == "none") {
                member_info.style.display = "inline";
            } else if (member_info.style.display == "inline") {
                member_info.style.display = "none";
            }
        } else if (!$(e.target).hasClass("member_info") && !$(e.target).hasClass("member_img") 
        && !$(e.target).hasClass("member_name") && !$(e.target).hasClass("member_email_title") && !$(e.target).hasClass("member_email")) {
            if (member_info.style.display == "inline") {
                member_info.style.display = "none";
            }
        }
        // console.log(e.target.className);
    });
    $(".logo").on("click", function (e) {
        location.href = "/";
        console.log(e.target.className);
    });
});