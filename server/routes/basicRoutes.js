import express from "express";
import {
  login,
  logout,
  auth,
  getData,
  createUser,
} from "../controllers/usersControl.js";
const router = express.Router();

//Start Adding ROutes
router.put("/login", login);
router.get("/logout", auth, logout);
router.get("/getData", auth, getData);
router.post("/signUp", createUser);

export default router;
