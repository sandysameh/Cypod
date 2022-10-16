import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import basicRoutes from "./routes/basicRoutes.js";

const app = express();
//This is for the JSON DATA mat3desh and every thing goees through body parser not just strings
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "200mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cors());
//Every Out has to start with /student that's what this part means
//app.use("/", studentRoutes);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const CONNECTION_URL =
  "mongodb+srv://admin:admin123@cluster0.kfz9vqj.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, connectionParams)
  .then(() => {
    console.log("DB IS CONNECTED ;)");
  })
  .catch(() => {
    console.log("DB IS NOT CONNECTED :(");
  });
app.use("/", basicRoutes);
app.listen(PORT, () => {
  console.log(`This server is running on  ${PORT}`);
});
///////////////////
