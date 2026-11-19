import express from "express";
import { getAllUser,sighIn,sighUp } from "../controllers/userController.js";
import {validate} from '../validations/validate.middleware.js'
import{signInValidation,signUpValidation}from '../validations/user.validation.js'

const router=express.Router();

router.get('/',getAllUser);
router.post('/register',validate(signUpValidation),sighUp);
router.post('/login',validate(signInValidation),sighIn);
 export default router;
 