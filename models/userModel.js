import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //to remove white space
    },
    email: {
      type: String,
      required: true,
      unique: true, //for each email id, there should be only one user
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String, //to add country code
      required: true,
    },
    address: {
      type: {},   //object for text area multiple lines
      required: true,
    },
    answer: {
      type:String,
      required : true
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }  //when new user is created,it's time will be added there
);

export default mongoose.model("users", userSchema);
