const jwt = require('jsonwebtoken');

const jwtKey = "ancbhddgfmgsf";

const auth = (req,res,next) =>{
    try{
        console.log(req.cookies)

        const token = req.cookies.token;
        console.log(token)
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        const verifiedAuth = jwt.verify(token, jwtKey)
        console.log(verifiedAuth)
        req.user = verifiedAuth.user;
        console.log(verifiedAuth.user)
        next();
    }catch(error){
        console.log(error)
        // res.send(error)
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports =auth;