import  User  from "../models/user.model.js";


export const getAllUser= async (req,res,next)=>{
    try {
      const users=await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
};

export const sighUp=async (req,res,next)=>{
  try {
     const { name,email,password,phone}=req.body;
     const existingUser =await User.findOne({email});
    if (existingUser) {
      next({status:400, message: 'שם המשתמש כבר קיים במערכת' });
    }
    const newUser=({name,  email,   password,phone});
    const saveUser= await newUser.save();
  
    res.status(201).json({message:'the user added',user:saveUser} );
  } catch (error) {
    next(error);
  }
};

export const sighIn=async(req,res,next)=>{
   try {
     const {email, password}=req.body;
     const user = User.findOne({email});
     if (!user) {
         next({status:401, message: 'אחד מהפרטים שגוי' });
       }

      res.status(200).json({
       message:'התחברות בוצעה בהצלחה',
       user:user
      }) ;
   } catch (error) {
    next(error);
   }
 };