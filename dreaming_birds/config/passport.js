var passport         = require('passport');
var GoogleStrategy   = require('passport-google-oauth2').Strategy;
const { User } = require('../models/User')

require("dotenv").config();

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");


passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL   : '/auth/google/callback',
    passReqToCallback   : true
  }, function(req, accessToken, refreshToken, profile, done){
    console.log('profile: ', profile);
    var user = profile;
    done(null, user);

    User.findOne({ id: profile.sub }, (err, user) => {
        //user가 없다면
        if (!user) {
        console.log('회원가입이 필요한 계정입니다')
        //=========
        const user = new User({
            "id": profile.sub,
            "name": profile.displayName,            
        })
        //user 모델에 저장
        user.save((err, userInfo) => {
            if (err) console.log(err)
            console.log(`====================`);
            console.log(user);
            console.log("회원가입을 완료했습니다")
        })
        //=========
        } else {
            console.log('이미 가입된 계정입니다')
        }
    })
    done(null, profile.sub);
    }
));

module.exports = passport;
