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
const upload = multer({ storage: storage });
var router = express.Router();
const { User } = require('../models/User')
const { Timer } = require('../models/Timer');
const Todo = require("../models/todo");
const Subject = require('../models/Subjects');



router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    console.log("세션이 유효합니다.");
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');

      } else {

        var today = new Date();
        const timer = new Timer();
        timer.hour = 0;
        timer.min = 0;
        timer.sec = 0;
        timer.date = `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`;
        
        let isInsert = true;

        let ut =-1;
        if(user.timer != null){
          ut = user.timer;
          ut.forEach((t)=>{
            if(t.date == timer.date ){
              console.log(t.date);
              console.log(timer.date);
              isInsert = false;
            }
          });
        }
        
       
        if(isInsert || ut ==-1)
        {
       

          User.findOneAndUpdate({ id: req.user.id }, { $push: { timer: timer } }, function (err, user) {
            if (err) {
              console.log('에러난다!');
            } else {
              console.log('성공..?');
            }
          });
        }
       


        res.render('index', {user: user});
      }
    });
  } else {
    console.log("세션이 유효하지 않습니다.");
    User.find({}, function (err, users) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        var sum = 0;
        for (var i = 0; i < users.length; i++) {
          for (var j = 0; j < users[i].subjects.length; j++) {
            sum += users[i].subjects[j].time;
          }
        }
        res.render('index', { user: null, whole: sum });
      }
    });
  }
});

// router.post("/", function (req, res) {



// });

router.get('/study/:id', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id, }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        //res.render('selectSubjectPage', { user: user });

        let list = User.find();
        res.render('studyPage', { user: user, data: list, subject_id: req.query.id });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});


router.post('/study/timer', function (req, res) {
  console.log(req.body.all_focus_time);
  let time = req.body.all_focus_time.split(':');
  var today = new Date();
  let data = {
    timer: {
      date: `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`,
      hour: parseInt(time[0]),
      min: parseInt(time[1]),
      sec: parseInt(time[2])
    }
  }
  // console.log(data);
  User.findOneAndUpdate({ id: req.user.id }, data, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      // 초 계산 후 과목 id가 맞는 과목에 초 더하기
      let subject_time = req.body.sub_time.split(':');
      let second = parseInt(subject_time[0] * 3600) + parseInt(subject_time[1] * 60) + parseInt(subject_time[2]);
      // console.log(second);
      User.updateOne({ 'subjects._id': req.query.sid }, {
        '$set': {
          'subjects.$.time': second
        }
      }, function (err) { if (err) console.log(err) });
      if (req.query.sub == 'stp') {
        res.redirect('/home');
      } else if(req.query.sub == 'rest') {
        res.redirect("/study/" + req.user.id + "?id=" + req.query.sid);
      } else {
        res.redirect('/selectSubject/' + req.user.id);
      }
    }
  });
});

router.post('/study/timeline', function (req, res) {
  let today = new Date();

  if (req.query.status == "start") {
    // console.log("타임라인 - 시작");
    let timeline = {
      subject: req.query.sid.slice(1, -1),
      startTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      endTime: "00:00:00",
      date: `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`
    }
    User.findOneAndUpdate({ id: req.user.id }, { $push: { timeLines: timeline } }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
    });
  } else {
    // console.log("타임라인 - 끝");
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        let timeline = {
          subject: user.timeLines[user.timeLines.length - 1].subject,
          startTime: user.timeLines[user.timeLines.length - 1].startTime,
          endTime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          date: user.timeLines[user.timeLines.length - 1].date
        }

        User.updateOne({ 'timeLines.startTime': timeline.startTime }, {
          '$set': {
            'timeLines.$.endTime': timeline.endTime
          }
        }, function (err) { if (err) console.log(err) });
      }
    });
  }
  res.redirect("/study/" + req.user.id + "?id=" + req.query.sid);
});

router.post('/study/warning', function (req, res) {
  // console.log(req.query.warning);
  let today = new Date();

  User.findOne({ id: req.user.id }, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      let today = new Date();
      var i = 0;
      for (i = 0; i < user.warning.length; i++) {
        if (user.warning[i].date == `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`) {
          // console.log('존재함');
          break;
        }
      }
      if (user.warning.length == i) {    // 오늘 처음 경고 받았을 때
        var w = new Array(0, 0, 0, 0);
        switch (req.query.warning) {
          case "focus_out": w[0]++; break;
          case "phone": w[1]++; break;
          case "sleep": w[2]++; break;
          case "leave": w[3]++; break;
        }
        let warning = {
          date: `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`,
          focus_out: w[0],
          phone: w[1],
          sleep: w[2],
          leave: w[3]
        }
        User.findOneAndUpdate({ id: req.user.id }, { $push: { warning: warning } }, function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/");
          }
        });
      } else {  // 이전에도 경고를 받았음
        var w = new Array(0, 0, 0, 0);
        var w_id;
        for (var i = 0; i < user.warning.length; i++) {
          if (user.warning[i].date == `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`) {
            w[0] = user.warning[i].focus_out;
            w[1] = user.warning[i].phone;
            w[2] = user.warning[i].sleep;
            w[3] = user.warning[i].leave;
            w_id = user.warning[i]._id;
            break;
          }
        }
        switch (req.query.warning) {
          case "focus_out": w[0]++; break;
          case "phone": w[1]++; break;
          case "sleep": w[2]++; break;
          case "leave": w[3]++; break;
        }

        User.updateOne({ 'warning._id': w_id }, {
          '$set': {
            'warning.$.focus_out': w[0],
            'warning.$.phone': w[1],
            'warning.$.sleep': w[2],
            'warning.$.leave': w[3]
          }
        }, function (err) { if (err) console.log(err) });
      }
    }
  });

  res.redirect("/study/" + req.user.id + "?id=" + req.query.sid);
});
router.get('/ranking', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return; console.log(err);
    } else {
      res.send(users);
    }
  });
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
    res.redirect("/auth/login");
  }
});

router.get('/my', function (req, res) {
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
    res.redirect("/auth/login");
  }
});

router.post('/my', upload.single('image'), function (req, res) {
  let data;
  if (req.file) {
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
    res.redirect('/my');
  });
});

router.post('/deleteSubject/:id/:box', function (req, res) {
  User.updateOne({ id: req.params.id }, { "$pull": { "subjects": { "_id": req.params.box.substring(4) } } }, { safe: true, multi: true }, function (err, obj) { });
});


router.get('/checklist/:id', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('checklistPage', { user: user });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/checklist/:id", function (req, res) {
  const todo = new Todo();
  todo.content = req.body.n;
  todo.date = req.body.d;

  console.log(todo);

  User.findOneAndUpdate({ id: req.user.id }, { $push: { todos: todo } }, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    console.log("성공");
    res.redirect('/checklist/' + req.params.id);
  });
});

router.post('/checked', function (req, res) {
  console.log("checkcheckcheckcheckcheck");
    var idx = req.query.idx; 
    var chk = req.query.ischeck;
    console.log(idx);
    console.log(`=======todo=======`);
    User.findOne({id:req.user.id}, function(err, user){
      if(err){
        console.log(err);
        res.redirect('/');
      }else{
        var todo_id = user.todos[idx]._id;
        console.log("id : " + todo_id);
        User.updateOne({'todos._id': todo_id}, {
          '$set' : {
            'todos.$.checked':chk
          }
        }, function(err){if(err) console.log(err)});
      }
    })

    console.log(`성공적인가?`);
});
// router.get('/checked', function (req, res) {
//   User.findOne({id:req.user.id}, function(err, user){
//     if(err){
//       console.log(err);
//       res.redirect('/');
//     }else{
//       res.send(user);
//     }
//   })
// });



router.get('/selectSubject/:id', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('selectSubjectPage', { user: user });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/selectSubject/:id", function (req, res) {
  const todo = new Todo();
  todo.content = req.body.n;
  todo.date = req.body.d;

  console.log(todo);

  User.findOneAndUpdate({ id: req.user.id }, { $push: { todos: todo } }, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    console.log("성공");
    console.log(user);
    res.redirect('/selectSubjectPage/' + req.params.id);
  });
});

router.get('/addSubject/:id', function (req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        console.log(user);
        res.render('addSubjectPage', { user: user });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

router.post("/addSubject/:id", function (req, res) {

  const subject = new Subject();
  var today = new Date();
  subject.name = req.body.n;
  subject.time = 0;
  subject.date = `${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()}.`;

  User.findOneAndUpdate({ id: req.user.id }, { $push: { subjects: subject } }, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    console.log("성공");
    if (req.body.mypage) {
      res.redirect('/my');
    } else {
      res.redirect('/addSubject/' + req.params.id);
    }
  });

});


// router.get('/googlelogin', function (req, res) {
//   res.render('main', { user: req.user });
// });


// router.get('/logout', function(req, res) {
//   req.logout();
//   req.session.save(function(){
//     console.log('계정이 로그아웃 되었습니다');
//     res.redirect('/');
//   })
// });

// router.get('/login', function (req, res) {
//   res.render('login')
// });

module.exports = router;