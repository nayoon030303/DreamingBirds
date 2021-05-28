function checkLoginStatus(){
    const nameTxt = document.querySelector("#name");
    const loginBtn = document.querySelector("#loginBtn");
   if(gauth.isSignedIn.get()){ //로그인되어있는지?
        console.log("logined");
        loginBtn.value = "Logout";
        const profile = gauth.currentUser.get().getBasicProfile();
        console.log(profile.getName());
        nameTxt.innerHTML = 'Welcome <strong>'+profile.getName()+'</strong>';
    }else{
        console.log("logouted");
        loginBtn.value = "Login";
        nameTxt.innerHTML = '';
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
}