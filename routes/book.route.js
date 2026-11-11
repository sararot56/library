import express from "express";
import {getAllBooks, getBookById ,getBooksByCategory, createBook ,updateBook ,deleteBook} from "../controllers/bookController.js";
import {checkImageExists,imageValidatorCreator} from "../middlewares/demo.middleware.js";

const router=express.Router();

router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.get('/category/:categoryName',getBooksByCategory);
router.post('/',createBook);
router.put('/:id',updateBook);
// router.put('/:id/borrow',addBorrow);
// router.put('/:id/returen',addReturen);
router.delete('/:id',deleteBook);


export default router;
