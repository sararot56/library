import express from "express";
import { books } from "../db.js";

const router=express.Router();

router.get('/',(req,res)=>{
    res.send({message: 'הבקשה התקבלה בהצלחה',
      date:  req.currentDate,data:books});
});
router.get('/:id',(req,res)=>{
    const bookId=Number(req.params.id);
    const book=books.find(x=>x.id===bookId);
    if(!book){
        return res.status(404).send({message:'the book isnot find'});
    }
    res.send({date:  req.currentDate,book});

});

router.post('/',(req,res)=>{
    const {id ,nameBook,category,price}=req.body;
    const newB={
        id ,
        nameBook,
        category,
        price,
        isBorrowed:false,
        Borroweds:[]
    };
   books.push(newB);
   res.status(201).send(newB);
});
router.put('/:id',(req,res)=>{
    const bookId=Number(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);
    if (bookIndex === -1) {
        return res.status(404).send({ message: 'הספר לא נמצא' });
      }
    const update=req.body;
    books[bookIndex] = {
        ...books[bookIndex],
        ...update,
        id: bookId // וידוא שהקוד המקורי אינו משתנה בטעות
      }; 
      res.send(books[bookIndex]); 
});
router.put('/:id/borrow',(req,res)=>{
const bookId=Number(req.params.id);
const bookIndex=books.findIndex(b=>b.id===bookId);
const {customerCode}=req.body;
if (bookIndex === -1) {
    return res.status(404).send({ message: 'הספר לא נמצא' });
  }
  if (books[bookIndex].isBorrowed) {
    return res.status(400).send({ message: 'הספר כבר מושאל' });
  }
  books[bookIndex].isBorrowed=true;
  books[bookIndex].Borroweds.push({
    date:new Date().toISOString().split('T')[0],
    customerCode
  });
  res.send(books[bookIndex]);
});
router.put('/:id/returen',(req,res)=>{
    const bookId=Number(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);
    if (bookIndex === -1) {
        return res.status(404).send({ message: 'הספר לא נמצא' });
      }
      if (!books[bookIndex].isBorrowed) {
        return res.status(400).send({ message: 'הספר לא היה מושאל' });
      }  
      books[bookIndex].isBorrowed=false;
      res.send(books[bookIndex]);
});
router.delete('/:id',(req,res)=>{
    const bookId = Number(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).send({ message: 'הספר לא נמצא' });
  }
  const deleteB=books.splice(bookIndex,1);
  res.send(deleteB[0]);
});
export default router;
