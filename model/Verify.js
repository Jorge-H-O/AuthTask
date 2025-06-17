//verify.js

const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const token = req.header("Authotization");
    if(!token){
        return res.status(401).json({
            error: "Access Denied"
        });
    } 
    try{
        const decode = jwt.verify(token, "your secret key");
        req.userId = decode.userId;
//        next();
    }catch(error){
        res.status(401).json({
            error: "Invalid Token"
        });
    }
};

module.exports = verifyToken
