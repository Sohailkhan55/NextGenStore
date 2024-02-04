import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address ,answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user already exists
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      message,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({     //if we don't return,further code will run from here
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role : user.role
      },
      token,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "message in login",
      message,
    });
  }
};

//ForgotPasswordController
export const forgotPasswordController = async(req,res) => {
  try{
    const {email,answer,newPassword} = req.body;
    if(!email){
      res.status(400).send({
        message: 'Email is required'
      })
    }
      if(!answer){
        res.status(400).send({
          message: 'Answer is required'
        }) 
      } 
        if(!newPassword){
          res.status(400).send({
            message: 'New Password is required'
          })
        }
    //Check email and answer
    const user = await userModel.findOne({email,answer});
    //validation
    if(!user){
      return res.status(404).send({ //if we don't return,further code will run from here
        success : false,
        message : "Wrong Email Or Answer"
      })
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success : true,
      message : 'Password Reset Successfully'
    })

    
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message: 'Something went wrong',
      error   //error object
    })
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (message) {
    console.log(message);
    res.send({ message });
  }
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and atleast 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};


//orders
export const getOrdersController = async (req,res) => {
  try{
    const orders = await orderModel.find({buyer: req.user._id}).populate("products","-photo").populate("buyer","name"); //we want only name of buyer
    res.json(orders)
  }catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message : 'Error while getting orders',
      error
    })

  }
};

// all orders
export const getAllOrdersController = async (req,res) => {
  try{
    const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt : "-1"});//sort to show latest on top
    res.json(orders)
  }catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message : 'Error while getting orders',
      error
    })

  }
};

//order status
export const orderStatusController = async(req,res) => {
  try{
    const {orderId} = req.params;
    const {status} = req.body;
    const orders = await orderModel.findByIdAndUpdate(orderId,{status} , {new : true}) ;
    res.json(orders);
  }catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message : 'Error while updating order',
      error
    })
  }
}

//all users
export const getUserController = async (req,res) => {
  try {
    const users = await userModel.find({});//.populate('name','email');
    res.status(200).send({
      success : true,
      message : 'All users',
      users,
      length : users.length
    })

  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success : false,
      message : 'Error in getting users',
      error : error.message
    })
  }
}

//delete a user
export const deleteUserController = async (req,res) => {
  try{
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).send({
          success : true,
          message : 'User deleted successfully'
      })
  }catch(error){
      console.log(error);
      res.status(500).send({
          success:false,
          message:'Error while deleting product',
          error
      })
  }
};

// promote user
export const promoteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Update user role to 1 (admin)
    const updatedUser = await userModel.findByIdAndUpdate(id, { role: 1 }, { new: true });

    res.status(200).send({
      success: true,
      message: 'User promoted successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while promoting user',
      error,
    });
  }
};

// promote user
export const demoteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Update user role to 1 (admin)
    const updatedUser = await userModel.findByIdAndUpdate(id, { role: 0 }, { new: true });

    res.status(200).send({
      success: true,
      message: 'Admin demoted successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while promoting user',
      error,
    });
  }
};