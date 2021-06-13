var express  = require('express');
var router   = express.Router();
var passport = require('../config/passport.js');

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");


router.get('/login', function(req,res, next){
  res.render('auth/login');
});



router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
  passport.authenticate('google'), authSuccess
);

function authSuccess(req, res) {
  res.redirect('/');
}


router.get("/administrator", function (req, res, next) {
  if(req && req.session && req.session.count) { 
    // 세션이 존재하는 경우
      req.session.count = req.session.count + 1;
      console.log("세션이 존재합니다.")
  } else { 
    // 세션이 존재하지 않는 경우
      req.session.count = 1;
      console.log("세션이 존재하지 않습니다.")
  }
  console.log(req.session.count);
});


module.exports = router;
