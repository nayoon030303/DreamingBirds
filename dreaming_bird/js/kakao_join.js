function kakaocheckLoginStatus(){
    const kakao_state = document.querySelector("#kakao_state");
    if(Kakao.Auth.getAccessToken()){
        console.log("kakao logined");
        kakao_state.value = "Logout";
        
    }else{
        console.log('kakao logouted');
        kakao_state.value = "Login";
        
    }
}

function clickkakaoLogin(){
    const kakao_state = document.querySelector("#kakao_state");
    if(kakao_state.value =='Login'){
        window.Kakao.Auth.login({ //로그인 추가 항목 동의 받기
            scope:'profile,account_email,gender,age_range',
            success:function(authObj){
                console.log(authObj);
                window.Kakao.API.request({ //동의 내역 확인하기
                    url: '/v2/user/me',
                    success:res=>{
                        const kakao_account = res.kakao_account;
                        console.log(kakao_account);
                        kakaocheckLoginStatus();
                    },
                    fail: function(error){
                        console.log(error);
                    }
                });
            },
            fail: function(error){
                console.log(error);
            }
        });
    }else{
        if (Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
              url: '/v1/user/unlink',
              success: function (response) {
                  console.log(response);
                  kakaocheckLoginStatus();
              },
              fail: function (error) {
                console.log(error);
              },
            })
            Kakao.Auth.setAccessToken(undefined)
          }
    }
    
}

function kakao_init(){
    window.Kakao.init('1c81cb135bf38850013ab9f5bb469de5');
    Kakao.isInitialized(); 
    kakaocheckLoginStatus();
    
    const kakaoBtn = document.querySelector(".kakao-btn");
    kakaoBtn.addEventListener('click',clickkakaoLogin);
}

window.addEventListener('load',kakao_init);