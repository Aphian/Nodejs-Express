var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var express = require('express');
var router = express.Router();

var authData = {
    // test data
    email: 'test@a.a.com',
    password: '111111',
    nickname: 'test',
};

router.get('/login', function(request, response){
    var title = 'WEB - Login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
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

router.post('/login_process', function(request, response){
    /*
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/?id=${title}`);
        })
    });
    */
    // body-parser 활용
    var post = request.body;
    var email = post.email;
    var password = post.password;
    if (email === authData.email && password === authData.password) {
        // success
        response.send('WelCome!!');
    } else {
        response.send('Fail!!');
    }
    // response.redirect(`/topic/${title}`);
});
  
// router.get('/update/:pageId', function(request, response){
//     var filteredId = path.parse(request.params.pageId).base;
//     fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
//         var title = request.params.pageId;
//         var list = template.list(request.list);
//         var html = template.HTML(title, list,
//         `
//         <form action="/topic/update_process" method="post">
//             <input type="hidden" name="id" value="${title}">
//             <p><input type="text" name="title" placeholder="title" value="${title}"></p>
//             <p>
//             <textarea name="description" placeholder="description">${description}</textarea>
//             </p>
//             <p>
//             <input type="submit">
//             </p>
//         </form>
//         `,
//         `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
//         );
//         response.send(html);
//     });
// });
  
// router.post('/update_process', function(request, response){  
//     var post = request.body;
//     var id = post.id;
//     var title = post.title;
//     var description = post.description;
//     fs.rename(`data/${id}`, `data/${title}`, function(error){
//         fs.writeFile(`data/${title}`, description, 'utf8', function(err){
//         response.redirect(`/topic/${title}`);
//         });
//     });
// });
  
// router.post('/delete_process', function(request, response){
//     var post = request.body;
//     var id = post.id;
//     var filteredId = path.parse(id).base;
//     fs.unlink(`data/${filteredId}`, function(error){
//         response.redirect(`/`);
//     });
// });
  
// router.get('/:pageId', function(request, response, next) {
//     var filteredId = path.parse(request.params.pageId).base;
//     fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
//         if (err) {
//             next(err)
//         } else {
//             var title = request.params.pageId.id;
//             var sanitizedTitle = sanitizeHtml(title);
//             var sanitizedDescription = sanitizeHtml(description, {
//                 allowedTags:['h1']
//             });
//             var list = template.list(request.list);
//             var html = template.HTML(sanitizedTitle, list,
//                 `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
//                 ` <a href="/topic/create">create</a>
//                 <a href="/update/${sanitizedTitle}">update</a>
//                 <form action="/topic/delete_process" method="post">
//                     <input type="hidden" name="id" value="${sanitizedTitle}">
//                     <input type="submit" value="delete">
//                 </form>`
//             );
//             response.send(html);
//         }
//     });
// });

module.exports = router;