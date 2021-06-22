// 헤더
let header = document.getElementById('header');
header.style.width = '100%';
header.style.height = '60px';
header.style.backgroundColor = 'white';
header.style.position = 'fixed';
header.style.top = '0px';
header.style.right = '0px';
header.style.zIndex = '99';
header.style.boxShadow = "0 1px 3px 1px #D2D2D2";

// 로고
let logo = document.createElement("img");
logo.setAttribute("src", "../img/dreamingBirds.png");
logo.className = 'logo';
logo.style.height = '70%';
logo.style.marginTop = '9px';
logo.style.marginLeft = '30px';
logo.style.float = 'left';
logo.style.cursor = 'pointer';
header.appendChild(logo);

// 헤더의 왼쪽
let join = document.createElement("a");
let login = document.createElement("a");

let member_more = document.createElement("button");
let member = document.createElement("div");
let member_img = document.createElement("img");

let member_info = document.createElement("div");
let member_profile = document.createElement("img");
let member_name = document.createElement("p");
let member_email_title = document.createElement("p");
let member_email = document.createElement("p");
let mypage_btn = document.createElement("button");
let logout_btn = document.createElement("button");

// if(user) {
//     user = user.replaceAll('\\', '');
//     user += '\"}';
//     user = JSON.parse(user);
// }
// console.log(user);

// 로그인?
if (!user) {
    login.className = "login";
    login.textContent = "로그인";
    login.href = "/auth/login";
    login.style.marginTop = '20px';
    login.style.marginRight = '20px';
    login.style.float = "right";
    login.style.fontSize = "15px";
    login.style.color = "black";
    login.style.textDecoration = "none";
    header.appendChild(login);
} else {
    member_more.className = "member_more";
    member_more.style.width = "0px";
    member_more.style.height = "0px";
    member_more.style.background = "white";
    member_more.style.border = "none";
    member_more.style.borderTop = "10px solid #C4C4C4";
    member_more.style.borderBottom = "10px solid none";
    member_more.style.borderRight = "7px solid transparent";
    member_more.style.borderLeft = "7px solid transparent";
    member_more.style.marginTop = "25px";
    member_more.style.marginRight = "15px";
    member_more.style.float = "right";
    member_more.style.padding = "0";
    member_more.style.cursor = "pointer";
    header.appendChild(member_more);

    member.className = 'member';
    member.style.width = '42px';
    member.style.height = '42px';
    member.style.marginTop = '9px';
    member.style.marginRight = '9px';
    member.style.borderRadius = '50%';
    member.style.overflow = 'hidden';
    member.style.float = 'right';
    member.style.cursor = "pointer";
    header.appendChild(member);

    member_img.className = 'member_img';
    member_img.setAttribute("src", user.profile_src);
    member_img.style.width = '42px';
    member_img.style.height = '42px';
    member_img.style.objectFit = 'cover';
    member.appendChild(member_img);

    // 회원 사진 클릭 시 보일 회원 정보
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

    member_profile.className = "member_profile";
    member_profile.setAttribute("src", user.profile_src);
    member_profile.style.borderRadius = '50%';
    member_profile.style.height = '80px';
    member_profile.style.width = '80px';
    member_profile.style.objectFit = 'cover';
    member_profile.style.marginTop = "30px";
    member_profile.style.border = "1px solid #CFCFCF";
    member_info.appendChild(member_profile);

    member_name.className = "member_name";
    member_name.textContent = user.nickname.replaceAll("&nbsp;", " ");
    member_name.style.borderBottom = "1px solid #CFCFCF";
    member_name.style.paddingBottom = "20px";
    member_info.appendChild(member_name);

    member_email_title.className = "member_email_title";
    member_email_title.textContent = "이메일";
    member_email_title.style.textAlign = "left";
    member_email_title.style.marginLeft = "15px";
    member_info.appendChild(member_email_title);

    member_email.className = "member_email";
    member_email.textContent = user.email;
    member_email.style.width = "200px";
    member_email.style.fontSize = "15px";
    member_email.style.borderBottom = "1px solid #CFCFCF";
    member_email.style.paddingBottom = "20px";
    member_email.style.margin = "0px";
    member_info.appendChild(member_email);

    mypage_btn.className = "mypage_btn";
    mypage_btn.textContent = "마이페이지";
    mypage_btn.style.width = "100%";
    mypage_btn.style.height = "100%";
    mypage_btn.style.background = "white";
    mypage_btn.style.color = "#6A6A6A";
    mypage_btn.style.border = "none";
    mypage_btn.style.borderBottom = "1px solid #CFCFCF";
    mypage_btn.style.padding = "10px 0";
    mypage_btn.style.cursor = "pointer";
    member_info.appendChild(mypage_btn);

    logout_btn.className = "logout_btn";
    logout_btn.textContent = "로그아웃";
    logout_btn.style.width = "100%";
    logout_btn.style.height = "100%";
    logout_btn.style.background = "white";
    logout_btn.style.color = "#6A6A6A";
    logout_btn.style.border = "none";
    logout_btn.style.borderBottom = "1px solid #CFCFCF";
    logout_btn.style.padding = "10px 0";
    logout_btn.style.cursor = "pointer";
    member_info.appendChild(logout_btn);
}



// 회원 사진 클릭 하면 회원 정보가 보이게 
$(document).ready(function () {
    $("html").on("click", function (e) {
        if ($(e.target).hasClass("member_img") || $(e.target).hasClass("member_more")) {
            if (member_info.style.display == "none") {
                member_info.style.display = "inline";                // 회원 정보
                member_more.style.border = "none";                  // 삼각형 방향
                member_more.style.borderTop = "10px solid none";
                member_more.style.borderBottom = "10px solid #C4C4C4";
                member_more.style.borderLeft = "7px solid transparent";
                member_more.style.borderRight = "7px solid transparent";
            } else if (member_info.style.display == "inline") {
                member_info.style.display = "none";
                member_more.style.border = "none";
                member_more.style.borderTop = "10px solid #C4C4C4";
                member_more.style.borderBottom = "10px solid none";
                member_more.style.borderLeft = "7px solid transparent";
                member_more.style.borderRight = "7px solid transparent";
            }
        } else if (!$(e.target).hasClass("member_info") && !$(e.target).hasClass("member_img") && !$(e.target).hasClass("member_more")
            && !$(e.target).hasClass("member_name") && !$(e.target).hasClass("member_email_title") && !$(e.target).hasClass("member_email")) {
            if (member_info.style.display == "inline") {
                member_info.style.display = "none";
                member_more.style.border = "none";
                member_more.style.borderTop = "10px solid #C4C4C4";
                member_more.style.borderBottom = "10px solid none";
                member_more.style.borderLeft = "7px solid transparent";
                member_more.style.borderRight = "7px solid transparent";
            }
        }
        // console.log(e.target.className);
    });

    // 요소 클릭 시 페이지 이동
    $(".logo").on("click", function (e) {
        location.href = "/";
    });
    $(".mypage_btn").on("click", function (e) {
        location.href = "/my";
    });
    $(".logout_btn").on("click", function (e) {
        location.href = "/logout";
    });

    // 버튼들 마우스오버시 색이 회색으로 바뀌게
    $(".mypage_btn").hover(function () {
        $(this).css("background", "#F0F1F3");
    }, function () {
        $(this).css("background", "white");
    });
    $(".logout_btn").hover(function () {
        $(this).css("background", "#F0F1F3");
    }, function () {
        $(this).css("background", "white");
    });
});