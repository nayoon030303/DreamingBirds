//구글 로그인
$(function(){
    function onSuccess(googleUser) {
        var profile = googleUser.getBasicProfile();
        //console.log(profile);
    }
        
    $(".g-signin2").on("click", function(){
        gapi.client.load('plus', 'v1', function () {
            gapi.client.plus.people.get({
                'userId': 'me'
            }).execute(function (res) {
                console.log(JSON.stringify(res));
                
                res.id += "@g";
                      
                $.ajax({
                    url : "/user/json/checkDuplication/"+res.id,
                    headers : {
                          "Accept" : "application/json",
                          "Content-Type" : "application/json"
                      },
                      success : function(idChk){
                            if(idChk==true){ //DB에 아이디가 없을 경우 => 회원가입
                                console.log("회원가입중...");
                                $.ajax({
                                    url : "/user/json/addUser",
                                    method : "POST",
                                    headers : {
                                      "Accept" : "application/json",
                                      "Content-Type" : "application/json"
                                    },
                                    data : JSON.stringify({
                                      userId : res.id,
                                      userName : res.displayName,
                                      password : "google123",
                                    }),
                                    success : function(JSONData){
                                       alert("회원가입이 정상적으로 되었습니다.");
                                       $("form").attr("method","POST").attr("action","/user/snsLogin/"+res.id).attr("target","_parent").submit();
                                    }
                                })
                            }
                            if(idChk==false){ //DB에 아이디가 존재할 경우 => 로그인
                                console.log("로그인중...");
                                $("form").attr("method","POST").attr("action","/user/snsLogin/"+res.id).attr("target","_parent").submit();
                            }
                        }
                  })
                })
           })
    })//e.o.google.loginLogic
    
    function onFailure(error) {
        console("error : "+error);
    }
    
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            self.location="/user/logout";
        });
    }
    
})//e.o.google

