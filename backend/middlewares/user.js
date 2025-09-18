const {getUser} = require("../service/auth")

const restrictToLoggedInUserOnly = (req,res,next) =>{

    const userUid = req.cookies?.uid;
    console.log("anish");
    console.log(req);
    console.log(userUid);
    console.log("anish");
    if(!userUid){
        return res.redirect("/signup");
    }

    const user = getUser(userUid);

    if(!user){
        return res.redirect("/login");
    }

    
    req.user = user ;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}