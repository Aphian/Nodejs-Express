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
        done(null, user.email);
    });
      
    // 로그인이 되면 페이지가 방문할 때마다 호출됨
    // 사용자의 실제 데이터를 조회함
    // callback 의 id 값을 DB에서 조회를 함
    passport.deserializeUser(function(id, done) {
        done(null, authData);
    });
        
    passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    // done 함수를 어떻게 출력하냐에 따라 로그인 확인 유무 가능
        function (username, password, done) {
            if (username === authData.email) {
                if (password === authData.password) {
                    return done(null, authData, {
                        message: 'Welcome.'
                    });
                } else {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
            } else {
                return done (null, false, {
                    message: "Incorrect username."
                });
            }
        }
    ));
    return passport;
}