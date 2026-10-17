const addCurrentDate=(req,res,next)=>{
    req.currentDate=new Date().toISOString().split('T')[0];
    next();
}

export default addCurrentDate;