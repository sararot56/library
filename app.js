import craeteServer,{json} from "express";
import { books } from "./db.js"; 
 
const app=craeteServer();
app.use(craeteServer.json());
const port=5000;

app.all('/',(req,res)=>{
    res.send("hello to my library");
});
// =============
// books
// =============
app.get('/books',(req,res)=>{
    res.send(books);
});
app.get('/books/:id',(req,res)=>{
    const bookId=Number(req.params.id);
    const book=books.find(x=>x.id===bookId);
    if(!book){
        return res.status(404).send({message:'the book isnot find'});
    }
    res.send(book);

});

app.post('/books',(req,res)=>{
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
app.put('/books/:id',(req,res)=>{
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
app.put('/books/:id/borrow',(req,res)=>{
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
app.put('/books/:id/returen',(req,res)=>{
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
app.delete('/books/:id',(req,res)=>{
    const bookId = Number(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).send({ message: 'הספר לא נמצא' });
  }
  const deleteB=books.splice(bookIndex,1);
  res.send(deleteB[0]);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});