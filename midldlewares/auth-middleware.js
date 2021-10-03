//미들웨어 구현
const jwt = require("jsonwebtoken");
const User = require("../models/user");
//기본 구조
module.exports = (req, res, next) => {
    //웹에서 로그인 후 vs에서 terminal로 확인해보면, 
    //미들웨어 호출확인 가능, 다음 핸들러가 호출되었음을 확인
    //console.log("여기를 지나쳤어요");
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    
    if(tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "my-secret-key");
        
        //database 에서 사용자정보 불러오고 next 호출
        //const user = await User.findById(userId).exec(); //await 사용불가, 비동기가 아니기 때문에
        const user = User.findById(userId).exec().then((user) => {
            res.locals.user = user;//다른곳에서 편해짐
            next(); // 비동기 아닌 경우에만 next() 허용됨
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;  
    }
    //finally
    // TIL OCT1
    // try loop -> catch loop -> success 
    // try loop -> catch loop -> next -> loop is done
}