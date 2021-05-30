function google_checkLoginStatus(){
    const loginBtn = document.querySelector("#google_state");
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

function signOut(){
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        console.log(gauth.signOut());
        google_checkLoginStatus();
    });
    auth2.disconnect();
}

function clickGoogleLogin(){
    const loginBtn = document.querySelector("#google_state");
    if(loginBtn.value === 'Login'){
        gauth.signIn().then(function(){
            console.log('gauth.signIn()');
            google_checkLoginStatus();
        });
    }else{
        signOut();
        
    }
}


function google_init() {
    gapi.load('auth2', function() {
        console.log("auth2");
        window.gauth = gapi.auth2.init({
            client_id: '1082331252373-fig6mnbrks48bcd3l9nt2bu74gmk7inf.apps.googleusercontent.com'
        });
        gauth.then(function(){
            console.log("googleAuth success");
            google_checkLoginStatus();
        }
        ,function(error){
            console.log(error);
            console.log("googleAuth fail");
        })
    });

    const googleBtn = document.querySelector(".google-btn");
    const loginBtn = document.querySelector('#google_state');
    loginBtn.addEventListener('click',clickGoogleLogin);
    googleBtn.addEventListener('click',clickGoogleLogin);
}