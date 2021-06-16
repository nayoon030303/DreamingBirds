var express = require('express');
const { session } = require('passport');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({storage: storage});
var router = express.Router();
const { User } = require('../models/User')

router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    console.log("세션이 유효합니다.");
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('index', { user: user });
      }
    });
  } else {
    console.log("세션이 유효하지 않습니다.");
    res.render('index', { user: null });
  }
});

router.get('/study', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('studyPage', { user: user });
      }
    });
  } else {
    res.render('main', { user: req.user });
  }
});

router.get('/home', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('homePage', { user: user });
      }
    });
  } else {
    res.render('main', { user: req.user });
  }
});

router.get('/my/:id', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.params.id);
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        //console.log(user);
        res.render('mypage', { user: user });
      }
    });
  } else {
    res.render('main', { user: req.user });
  }
});
router.post('/my/:id', upload.single('image'), function (req, res) {
  let data;
  if(req.file) {
    data = {
      nickname: req.body.nickname.trim() != '' ? req.body.nickname : req.user.displayName,
      intro: req.body.intro,
      profile_src: "../uploads/" + req.file.filename
    };
  } else {
    data = {
      nickname: req.body.nickname.trim() != '' ? req.body.nickname : req.user.displayName,
      intro: req.body.intro
    };
  }
  
  User.findOneAndUpdate({ id: req.user.id }, data, function (err) {
    res.redirect('/my/' + req.params.id);
  });
});

router.get('/googlelogin', function (req, res) {
  res.render('main', { user: req.user });
});

router.get('/login', function(req, res) {
  res.render('login')
});

module.exports = router;