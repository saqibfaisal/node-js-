const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try{
        // console.log("ghghgh");
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const verify = jwt.verify(token,"login process");
        // console.log(verify);
        if(verify.userTypes=="admin"){

            next()
        }
        else{
            res.status(401).json({
                message:"you are not admin"
            })
        }
    }
    catch(error){
        // console.log("failed")
        return res.status(401).json({
            message:"invaild token"
        })
    }
    // console.log(req.headers.authorization);
    // next()
}