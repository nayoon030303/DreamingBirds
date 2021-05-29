function kakaoLogin(){
    window.Kakao.Auth.login({ //로그인 추가 항목 동의 받기
        scope:'profile,account_email,gender,age_range',
        success:function(authObj){
            console.log(authObj);
            window.Kakao.API.request({ //동의 내역 확인하기
                url: '/v2/user/me',
                success:res=>{
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account);
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
}

function init(){
    window.Kakao.init('1c81cb135bf38850013ab9f5bb469de5');
    Kakao.isInitialized(); 
    
    const kakaoBtn = document.querySelector(".kakao-btn");
    kakaoBtn.addEventListener('click',kakaoLogin);
}

window.addEventListener('load',init);