import express from "express";
import {borrowBook,getAllBooks, getBookById ,getBooksByCategory, createBook ,updateBook ,deleteBook} from "../controllers/bookController.js";
import {checkImageExists,imageValidatorCreator} from "../middlewares/demo.middleware.js";
import {validate} from '../validations/validate.middleware.js';
import {createBookValidation,updateBookValidation} from '../validations/book.validation.js';
import {borrowBookValidation} from "../validations/borrow.validation.js"

const router=express.Router();

router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.get('/category/:categoryName',getBooksByCategory);
router.post('/',validate(createBookValidation),createBook);
router.put('/:id',validate(updateBookValidation),updateBook);
router.put('/borrow',validate(borrowBookValidation),borrowBook);
// router.put('/:id/returen',addReturen);
router.delete('/:id',deleteBook);


export default router;
