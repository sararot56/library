import express from "express";
import { users } from "../du.js";

const router=express.Router();

router.get('/',(req,res)=>{
    res.send(users);
});
router.register=
router.post('/register',(req,res)=>{
   const { id, nameUser,  mail,   code,BorrowedBook}=req.body;
   const existingUser = users.find(u => u.nameUser === nameUser);
  if (existingUser) {
    return res.status(400).send({ message: 'שם המשתמש כבר קיים במערכת' });
  }
  const newUser={id, nameUser,  mail,   code,BorrowedBook};
  users.push(newUser);

  res.status(201).send({newUser} );
});

router.post('/login',(req,res)=>{
    const {nameUser, code}=req.body;
    const user = users.find(u => u.nameUser === nameUser && u.code===code);
    if (!user) {
        return res.status(401).send({ message: 'שם משתמש או סיסמה שגויים' });
      }
   res.status(201).send({user} );
 });
 export default router;
 