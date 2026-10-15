import express from "express";
import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";

const router =express.Router();

router.use('/users',userRouter);
router.use('/books',bookRouter);

export default router;
