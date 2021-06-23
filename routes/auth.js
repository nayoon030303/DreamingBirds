var express  = require('express');
var router   = express.Router();
var passport = require('../config/passport.js');


router.get('/login', function(req,res, next){
  res.render('auth/login');
});

router.get('/logout', function(req, res) {
  logoutWithKakao();
  req.logout();
  res.redirect('/');
});

function logoutWithKakao(){
  Kakao.Auth.logout();
  alert('카카오 로그아웃 완료!');
  setCookie("kakao_login","",-1);  // 쿠키삭제 (로그아웃)
}

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google'), authSuccess
);

router.get('/kakaotalk',
 passport.authenticate('kakao')
);

router.get('/kakao/callback', 
  passport.authenticate('kakao'), authSuccess
);


function authSuccess(req, res) {
  res.redirect('/');
}


module.exports = router;
