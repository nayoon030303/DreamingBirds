var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require("./models/User");
const session = require('express-session');

app.use(session({
    secret: 'secretWords',
    resave: false,
    saveUninitialized: true
}));
  

// var router = require('./routes/auth')(app);     // 라우터 모듈인 main.js 를 불러와서 app 에 전달

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

  
app.set('views', __dirname + '/views');         // 서버가 읽을 수 있도록 HTML 의 위치를 정의
app.set('view engine', 'ejs');                  // 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
// app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}));

// passport 설정
app.use(passport.initialize());
app.use(passport.session());
// 라우터 설정
app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));

app.post('/api/users/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)
  
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
    })
  })

app.post('/api/users/login', (req, res) => {
    user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
})
  
  
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));