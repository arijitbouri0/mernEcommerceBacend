const jwt=require("../jwtProvider");
const userService=require("../Service/user.service")

const authenticate=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
            return req.status(404).send({error:"token not found..."});
        }
        const userId = jwt.getUserIdFromToken(token);
        const user=await userService.findUserByID(userId);
        req.user=user;
    } catch(error){
        return res.status(500).send({error:error.message});
    }

    next();
}

module.exports=authenticate;