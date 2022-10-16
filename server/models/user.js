import mongoose from "mongoose";
//create an instance of mongoose
//Here we will define our Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["A", "E", "U"], //A: Admin , E:Engineer, U :User
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//How can i Give a value u by default staring the section part

const user = mongoose.model("user", userSchema);
export default user;
