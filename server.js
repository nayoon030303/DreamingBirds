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

// app.use(express.json())
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

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));