import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
//in middleware after req,next will be validated and after that response will be sent
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(    //whenever we make a request,next will be validated and then response will be sent
      req.headers.authorization, //token will be in headers in authorization & decode key is JWT_SECRET
      process.env.JWT_SECRET
    );
    req.user = decode; //decrypt,to read id
    next();  //after this further code will be executed
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {    //if not admin
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();//allow further execution if user is admin
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
