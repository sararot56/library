import Book from "../models/book.model.js";


export const getAllBooks= async (req, res, next)=>{
  try {
    const books =await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error)
  }
}

export const getBookById=async(req,res,next)=>{
    try {

      const book=await Book.findById(req.params.idx)
      if(book){
          return res.status(200).json(book);
      }
      else{
        next({status:404,msg:`book ${req.params.idx} not found`,type:'resource-not-found'});
      }
    } catch (error) {
      next(error)
      
    }

};

// קבלת ספרים לפי קטגוריה
export const getBooksByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const books = await Book.find({ categories: categoryName });
    res.status(200).json({
      count: books.length,
      books
    });
  } catch (error) {
    next(error);
  }
};

export const createBook= async(req,res,next)=>{
    try {
      console.log("נתונים שהתקבלו מ-Postman:", req.body); // הוסף שורה זו
      const bookData={...req.body};

      if (req.imageFileName) {
        bookData.image = req.imageFileName;
    }
      const newB=new Book(bookData);
      const saveB=await newB.save();
      res.status(201).json(saveB);
    } catch (error) {
      next(error);
    }
};

export const updateBook= async (req,res,next)=>{
    try {
      const {id}=req.params;
      const updatedB=Book.findByIdAndUpdate(id,req.body,{
        returnDocument:'after',
        runValidators:true
      });
      if (!updatedB) {
           next({status:404, message: 'הספר לא נמצא' ,type: 'resource-not-found'});
        }
        res.status(200).json(updatedB); 
    } catch (error) {
      next(error)
    }
};

export const borrowBook=async(req,res,next)=>{
try {
  const { bookId, userId, returnDate } = req.body;

    // 1. בדיקה האם הספר קיים
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    // 2. בדיקה האם הספר כבר מושאל
    if (book.isBorrowed) {
      return res.status(400).json({ message: 'הספר כבר מושאל למשתמש אחר' });
    }

    // 3. בדיקה האם המשתמש קיים
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'המשתמש לא נמצא' });
    }

    // 4. בדיקת מגבלה: האם למשתמש יש פחות מ-3 ספרים מושאלים
    if (user.borrowedBooks.length >= 3) {
      return res.status(400).json({ message: 'המשתמש הגיע למכסה המקסימלית של 3 ספרים מושאלים' });
    }

    // 5. עדכון נתוני הספר
    book.isBorrowed = true;
    book.borrowedBy = userId;
    await book.save();

    // 6. הוספת הספר למערך הספרים של המשתמש
    user.borrowedBooks.push({
      bookId: book._id,
      name: book.name,
      returnDate: new Date(returnDate)
    });
    await user.save();

    // 7. יצירת תיעוד היסטוריית השאלה
    const newBorrowing = new Borrowing({
      userId,
      bookId,
      returnDate: new Date(returnDate),
      status: 'active'
    });
    await newBorrowing.save();

    res.status(200).json({
      message: 'הספר הושאל בהצלחה',
      borrowedBook: {
        bookId: book._id,
        name: book.name,
        returnDate
      }
    });
} catch (error) {
  next(error);
}
};

// export const addReturen=(req,res)=>{
//     const bookId=Number(req.params.id);
//     const bookIndex=books.findIndex(b=>b.id===bookId);
//     if (bookIndex === -1) {
//         return res.status(404).send({ message: 'הספר לא נמצא' });
//       }
//       if (!books[bookIndex].isBorrowed) {
//         return res.status(400).send({ message: 'הספר לא היה מושאל' });
//       }  
//       books[bookIndex].isBorrowed=false;
//       res.send(books[bookIndex]);
// };

export const deleteBook=async(req,res,next)=>{
   try {
     const {id} = req.params;
     const deleteB = await Book.findByIdAndDelete(id);
 
   if (!deleteB) {
    return next({ status: 404, msg: `product ${id} is not found!`, type: 'resource-not-found' });
   }
   
   res.status(204).json({message:'the book is delete',book:deleteB});
   } catch (error) {
     next(error)
   }
};