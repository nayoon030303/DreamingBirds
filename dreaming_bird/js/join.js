function checkLoginStatus(){
    const loginBtn = document.querySelector("#loginBtn");
    if(gauth.isSignedIn.get()){ //로그인되어있는지?
        console.log("logined");
        loginBtn.value = "Logout";
        const profile = gauth.currentUser.get().getBasicProfile();
        console.log(profile);
    }else{
        console.log("logouted");
        loginBtn.value = "Login";
    }
}

function clickGoogleBtn(){
    const loginBtn = document.querySelector("#loginBtn");
    if(loginBtn.value === 'Login'){
        gauth.signIn().then(function(){
            console.log('gauth.signIn()');
            checkLoginStatus();
        });
    }else{
        gauth.signOut().then(function(){
            console.log('gauth.signOut()');
            checkLoginStatus();
        });
    }
}


function init() {
    gapi.load('auth2', function() {
        console.log("auth2");
        window.gauth = gapi.auth2.init({
            client_id: '1082331252373-fig6mnbrks48bcd3l9nt2bu74gmk7inf.apps.googleusercontent.com'
        });
        gauth.then(function(){
            console.log("googleAuth success");
            checkLoginStatus();
        }
        ,function(){
            console.log("googleAuth fail");
        })
    });

    const googleBtn = document.querySelector(".google-btn");
    const loginBtn = document.querySelector('#loginBtn');
    loginBtn.addEventListener('click',clickGoogleBtn);
    googleBtn.addEventListener('click',clickGoogleBtn);
}