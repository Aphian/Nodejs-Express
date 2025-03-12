var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
  
var app = express()

// session을 사용할 수 있도록 함
app.use(session({
    // 노출 되지 않아야 하는 data
    secret: 'keyboard cat',

    // false : session 데이터가 변경하지 않으면 session 저장소의 값을 저장하지 않는다.
    // true : 변경 유무를 따지지 않고 저장소에 저장.
    resave: false,

    // true : session 이 필요하기 전까진 session을 구동하지 않음.
    // false : 필요 유무를 따지지 않고 구동함.
    saveUninitialized: true
}))
 
app.get('/', function (req, res, next) {
  res.send('Hello Session!!');
})
 
app.listen(3000, function(){
    console.log('Express-Seeion!!');
});