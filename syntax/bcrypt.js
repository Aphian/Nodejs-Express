// 비동기 방식
var bcrypt = require('bcrypt');

// 일종의 noisy
const saltRounds = 10;

const myPlaintextPassword = '111111';
const someOtherPlaintextPassword = '111112';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, function(err, result){
        console.log('My Password', result);
    });

    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
        console.log('Some Password', result);
    });
});
