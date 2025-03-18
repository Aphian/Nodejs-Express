module.exports = function(app) {
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
    
    // session 처리 방법
    // serialize 기능 설치
    passport.serializeUser(function(user, done) {
        // session data 안에 user.email 이라는 사용자 식별자가 들어감
        // console.log('serializeUser', user);
        done(null, user.email);
    });
      
    // 로그인이 되면 페이지가 방문할 때마다 호출됨
    // 사용자의 실제 데이터를 조회함
    // callback 의 id 값을 DB에서 조회를 함
    passport.deserializeUser(function(id, done) {
    // console.log('deserializeUser', id);
        done(null, authData);
    });
        
    passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    // done 함수를 어떻게 출력하냐에 따라 로그인 확인 유무 가능
        function (username, password, done) {
            // console.log(username, password);
            if (username === authData.email) {
                // console.log(1);
                if (password === authData.password) {
                    // console.log(2);
                    return done(null, authData);
                } else {
                    // console.log(3);
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
            } else {
                // console.log(4);
                return done (null, false, {
                    message: "Incorrect username."
                });
            }
        }
    ));
    return passport;
}