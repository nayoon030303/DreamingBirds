// module.exports = function (app) {
//     app.get('/', function (req, res) {
//         res.render('index.html');
//     });
//     app.get('/select', function (req, res) {
//         res.render('selectSubjectPage.html');
//     });
//     app.get('/home', function (req, res) {
//         res.render('homePage.html');
//     });
//     app.get('/my', function (req, res) {
//         res.render('mypage.html');
//     });
//     app.get('/study', function (req, res) {
//         res.render('studyPage.html');
//     });
// }

var express = require('express');
const { session } = require('passport');
var router = express.Router();

router.get('/', function (req, res) {
  if (req && req.session && req.session.count) {
    // 세션이 존재하는 경우
    req.session.count = req.session.count + 1;
    console.log("세션이 존재합니다.");
  } else {
    // 세션이 존재하지 않는 경우
    req.session.count = 1;
    console.log("세션이 존재하지 않습니다.")
  }
  console.log(req.session.count);
  res.render('index', { user: JSON.stringify(req.user) });
});

router.get('/study', function (req, res) {
  res.render('studyPage', { user: JSON.stringify(req.user) });
});
router.get('/home', function (req, res) {
  res.render('homePage', { user: JSON.stringify(req.user) });
});
router.get('/my', function (req, res) {
  res.render('mypage', { user: JSON.stringify(req.user) });
});
router.get('/googlelogin', function (req, res) {
  res.render('main', { user: req.user });
});
// router.get('/logout', function(req, res) {
//   req.logout();
//   req.session.save(function(){
//     console.log('계정이 로그아웃 되었습니다');
//     res.redirect('/');
//   })
// });

module.exports = router;