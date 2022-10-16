import mongoose from "mongoose";
const expiredtokens = mongoose.Schema({
  expired: String,
});

const expiredtoken = mongoose.model("expiredtoken", expiredtokens);
export default expiredtoken;
