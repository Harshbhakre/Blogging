export const AuthReq = (req,res,next)=>{
    if(!req.session.userId){
        return res.status(400).redirect("/loginPage")
    }
    next()
}

export const checkAuth = (req,res,next)=>{
    res.locals.isAuthenticated =req.session.userId?true:false
    next()
}