var template = require('../lib/template.js');

var express = require('express')
var router = express.Router();

// application 이라는 객체를 반환함.
// route 또는 routing -> 사용자들이 경로마다 반환해줘야하는데 방향을 알려주는 것.
// app.get('/', (req, res) => {res.send('Hello World!')})
// app.get --> router 로 분리를 했기 때문에 router.get 으로 변경
router.get('/', function(request, response) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:250px; display: block; margin-top: 10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
});

module.exports = router;