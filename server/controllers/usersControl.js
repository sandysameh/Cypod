import userData from "../models/user.js";
import expiredtoken from "../models/expiredtokens.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logincheck, signupcheck } from "../joi/user_joi.js";
import data from "../data/data.json" assert { type: "json" };
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const exptoken = await expiredtoken.findOne({ expired: token });
    if (exptoken) {
      return res.json({ msg: "This token is expired" });
    }
    if (!token) {
      return res.json({ msg: "not authorized" });
    }

    const verified = jwt.verify(token, process.env.HEADER64); // verfiy begeb id user
    if (!verified) {
      return res.json({ msg: "not authorized 2" });
    }
    req.ownerid = verified.ownerid;
    req.tokenrole = verified.tokenrole;

    next();

    //middleware function lazem teroh 3al function tanya
  } catch (error) {
    res.json({ msg: error.message });
  }
};

// export const createUser = async (req, res) => {
//   try {
//     //TO DO : JOI THINGS
//     let { name, email, password } = req.body;
//     const check = {
//       name: name,
//       email: email,
//       password: password,
//     };

//     const result = signupcheck.validate(check);

//     const { value, error } = result;
//     const valid = error == null;
//     if (!valid) {
//       return res.json({ msg: error.details[0].message });
//     }

//     const existingUser = await userData.findOne({ email: email });
//     if (existingUser) {
//       return res.json({ msg: "This email already exists" });
//     }
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userData({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });
//     const savedUser = await newUser.save();
//     const token = jwt.sign(
//       { ownerid: savedUser._id, name: savedUser.name },
//       JWT_PASSWORD
//     );
//     res.header("auth-token", token);
//     res.setHeader("auth-token", token);
//     res.json({ token, savedUser });
//     //TO DO : I should be Logged in Now.
//   } catch (error) {
//     res.json({ msg: error.message });
//   }
// };

export const createUser = async (req, res) => {
  try {
    //TO DO : JOI THINGS
    let { name, email, password, role } = req.body;
    const check = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    const result = signupcheck.validate(check);

    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
      let errormsg = error.details[0].message.includes("role")
        ? "This is an invalid role"
        : error.details[0].message;
      return res.json({ msg: errormsg });
    }

    const existingUser = await userData.findOne({ email: email });
    if (existingUser) {
      return res.json({ msg: "This email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userData({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { ownerid: savedUser._id, tokenrole: savedUser.role },
      process.env.HEADER64
    );

    res.header("auth-token", token);
    res.setHeader("auth-token", token);
    let tokenrole = savedUser.role;

    res.json({
      token,
      user: {
        email: savedUser.email,
        id: savedUser._id,
      },
      tokenrole,
    });
    //TO DO : I should be Logged in Now.
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = {
      email: email,
      password: password,
    };

    const result = logincheck.validate(check);

    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
      return res.json({ msg: error.details[0].message });
    }

    const existinguser = await userData.findOne({ email: email });

    if (!existinguser) {
      return res.json({ msg: "Your not registered" });
    }

    const ismatched = await bcrypt.compare(password, existinguser.password);
    if (!ismatched) {
      return res.json({ msg: "Wrong Password" });
    }

    const token = jwt.sign(
      { ownerid: existinguser._id, tokenrole: existinguser.role },
      process.env.HEADER64
    );
    res.header("auth-token", token);
    res.setHeader("auth-token", token);
    let tokenrole = existinguser.role;

    res.json({
      token,
      user: {
        email: existinguser.email,
        id: existinguser._id,
      },
      tokenrole,

      // msg: "You are logged in succesfully",
    });
  } catch (error) {
    //TO DO : I should be Logged in Now.
    res.json({ msg: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const authtoken = req.header("auth-token");
    const token = new expiredtoken({
      expired: authtoken,
    });
    await token.save();

    res.send("LoggedOut !");
  } catch (error) {
    //important
    res.json({ msg: error.message });
  }
};

// TODO : list of Lives
export const getData = async (req, res) => {
  try {
    if (req.tokenrole !== "A") {
      return res.json({ msg: "You are not authorized to do this" });
    }

    res.json({ data });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
//  TODO:  export const deleteLive
