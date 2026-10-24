import express from "express";
import { getAllUser,sighIn,sighUp } from "../controllers/userController.js";

const router=express.Router();

router.get('/',getAllUser);
router.post('/register',sighUp);
router.post('/login',sighIn);
 export default router;
 