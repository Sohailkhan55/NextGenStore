import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    }, 
    slug:{   //to make axios friendly
        type:String,
        required:true
    },
    description:{
        type:String,
        required : true
    },
    price:{
        type:Number,
        required : true,
    },
    category:{
        type:mongoose.ObjectId,   // to ensure category is unique
        ref:'Category',   //To link product with category
        required : true
    },
    quantity:{
        type:Number,
        required : true
    },
    photo:{
        data : Buffer,
        contentType : String
    },
    shipping:{  //status of order
        type:Boolean,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    


},{timestamps:true});//stores time at which product was created

export default mongoose.model('Products',productSchema);