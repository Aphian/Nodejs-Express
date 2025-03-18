var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    router.get('/login', function(request, response){
        var fmsg = request.flash();
        var feedback = '';
        if (fmsg.error) {
            feedback = fmsg.error[0];
        }
    
        var title = 'WEB - Login';
        var list = template.list(request.list);
        var html = template.HTML(title, list, `
            <div style="color: red;">${feedback}</div>
            <form action="/auth/login_process" method="post">
                <p><input type="text" name="email" placeholder="email"></p>
                <p><input type="password" name="password" placeholder="password"></p>
                <p>
                    <input type="submit" value="Login">
                </p>
            </form>
        `, '');
        response.send(html);
    });
    // passport 형식으로 변환 필요
    // router.post('/login_process', function(request, response){
    //     var post = request.body;
    //     var email = post.email;
    //     var password = post.password;
    //     if (email === authData.email && password === authData.password) {
    //         // success
    //         // session 에 is_logined 와 nickname 속성을 저장함
    //         // 메모리에 저장된 session 정보를 session store 저장하는 작업을 함.
    //         request.session.is_logined = true;
    //         request.session.nickname = authData.nickname;
    
    //         // session 객체애 있는 Data를 session store 에 반영 하는 작업을 바로 시작함
    //         request.session.save(function(){
    //             response.redirect(`/`);
    //         });
    //     } else {
    //         response.send('Fail!!');
    //     }
    // });
    
    // passport 전환
    router.post('/login_process', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true,
    }));
    
    router.get('/logout', function(request, response, next){
        request.logout(function(error) {
            if (error) {
                return next(error);
            }
            request.session.save(function(){
                response.redirect('/');
            });
        });
    });
    return router;
}