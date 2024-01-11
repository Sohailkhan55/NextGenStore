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
//configure env
dotenv.config();

//databse config
connectDB();

//rest object to create api's
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(expresss.static(path.join(__dirname,'./client/build')))

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
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white

  );
});
