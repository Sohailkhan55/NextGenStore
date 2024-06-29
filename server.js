import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";    //by morgan api request gets shown in the console
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//configure env
dotenv.config();

//databse config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object to create api's
const app = express();

//middelwares
app.use(cors());
app.use(express.json());//in req and reqsponse we can send json data,instead of bodyParser,we can do by this in express
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

//PORT
const PORT = process.env.PORT || 4000;

//run listen
app.listen(PORT, () => { //Note: It is connected with expense tracker project DB
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white

  );
});

//Actual MONGO_URL
//mongodb+srv://Sohail:Test123@cluster0.cmla8od.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
