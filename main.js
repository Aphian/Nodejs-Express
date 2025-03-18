var fs = require('fs');
var express = require('express')
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');

// 함수처럼 호출
var app = express();

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

app.use(flash());
app.get('/flash', function(request, response) {
  // session store 에 저장이 되는 값들.
  request.flash('msg', 'Flash is back!');
  response.send('flash');
});

app.get('/flash-display', function(request, response) {
  var fmsg = request.flash();
  console.log(fmsg);
  response.send(fmsg);
});

var passport = require('./lib/passport.js')(app);

// middleware 생성
// next 호출되어야 할 middleware 가 담겨있음.
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');
var authRouter = require('./routes/auth.js')(passport);

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