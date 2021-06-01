
function naver_join_callback_init(){
    var naver_id_login = new naver_id_login("VmNAEoXXFW6xldlrKtoP", "http://localhost:3000/html/test/naver_login_callback.html");
    // 접근 토큰 값 출력
    alert(naver_id_login.oauthParams.access_token);
    // 네이버 사용자 프로필 조회
    naver_id_login.get_naver_userprofile("naverSignInCallback()");
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    function naverSignInCallback() {
        alert(naver_id_login.getProfileData('name'));
        alert(naver_id_login.getProfileData('email'));
        alert(naver_id_login.getProfileData('profile_image'));
        alert(naver_id_login.getProfileData('gender'));
        alert(naver_id_login.getProfileData('birthyear'));
        alert(naver_id_login.getProfileData('age'));
    }
    //https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=VmNAEoXXFW6xldlrKtoP&client_secret=sxYcovjqDB&access_token=AAAAN2e1jFQTfxj6fmjKYqRHj7cRtM1tCTHWm6KTKrrTWg7iQydIMpvxpAJnJsewp_3wkSVepkMoVGxvaukhLQ_JOKI&state=43c5cbf5-436e-41fb-be75-d50dc3df7b79&token_type=bearer&expires_in=3600&service_provider=NAVER
}

naver_join_callback_init();