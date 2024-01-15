const jwt=require("jsonwebtoken");
const secret='satabdo'
function userMiddleware(req,res,next){
    const token=req.headers.authentication;
    const jwttoken=token.split(' ')[1];
    const verified=jwt.verify(jwttoken,secret);
    if(verified){
        // console.log(verified.username);
        req.user=verified.username;
        next()
        
    }
    else{
        return res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}
module.exports=userMiddleware;