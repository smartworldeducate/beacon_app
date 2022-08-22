import express from "express";
import { body } from "express-validator";
import {register,login} from '../mysqlController/AuthController.js'


const router = express.Router();

router.post(
  "/register",
  [
    body("name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),
    body("username", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  register
);


//login route

router.post(
  "/login",
  [
    body("username", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);





export default router;
