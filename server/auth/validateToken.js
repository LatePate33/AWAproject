const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.cookies.token; // get the token as a cookie
    console.log(authHeader);
    let token;
    if(authHeader) {
        token = authHeader;
    } else {
        token = null;
    }
    console.log(token);
    if(token == null) return res.sendStatus(401).json({message: "Unauthorized"}); // if no token
    console.log("Token found");
    console.log(process.env.SECRET);
    jwt.verify(token, process.env.SECRET, function (err, user) {
        if(err) {
            console.log(err);
            return res.sendStatus(403).json({message: "Forbidden"}); // if token is not valid e.g. expired
        } 
        req.user = user;
        next();
    });


    
};

