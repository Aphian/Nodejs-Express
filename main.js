var fs = require('fs');
var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');
var authRouter = require('./routes/auth.js');

var express = require('express')
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session')
var FileStore = require('session-file-store')(session);

// 함수처럼 호출
var app = express()

// body-parser 가 만들어내는 middelware를 표현한 것임
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

var authData = {
    // test data
    email: 'test@a.a.com',
    password: '111111',
    nickname: 'test',
};

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

// serialize 기능 설치
passport.serializeUser(function(user, done) {
  // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  // done 함수를 어떻게 출력하냐에 따라 로그인 확인 유무 가능
  function (username, password, done) {
    console.log(username, password);
    if (username === authData.email) {
      console.log(1);
      if (password === authData.password) {
        console.log(2);
        return done(null, authData);
      } else {
        console.log(3);
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    } else {
      console.log(4);
      return done (null, false, {
        message: "Incorrect username."
      });
    }
  }
));

// passport 전환
app.post('/auth/login_process', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

// middleware 생성
// next 호출되어야 할 middleware 가 담겨있음.
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
// /topic 시작으로 하는 route 에 topicRouter 라는 middleware 이름 부여
app.use('/topic', topicRouter);

app.use('/auth', authRouter);

app.use(function(err,request, response, next) {
  response.status(404).send('Not Found Page!');
});

app.use(function(err, request, response, next){
  response.status(500).send('Something broke!!');
});

app.listen(3000, function() {
  console.log(`Example app listening on port 3000!`)
});

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
      } else {
        
      }
    } else if(pathname === '/create'){
      
    } else if(pathname === '/create_process'){
      
    } else if(pathname === '/update'){

    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){

    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/