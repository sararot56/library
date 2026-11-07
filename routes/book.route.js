import express from "express";
import {get,getById,addBook,addBorrow,addReturen,updateById,dellete} from "../controllers/bookController.js";
import {checkImageExists,imageValidatorCreator} from "../middlewares/demo.middleware.js";

const router=express.Router();

router.get('/',get);
router.get('/:id',getById);
router.post('/',addBook);
router.put('/:id',updateById);
router.put('/:id/borrow',addBorrow);
router.put('/:id/returen',addReturen);
router.delete('/:id',dellete);


export default router;
