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
        type:mongoose.ObjectId,  //To link product with category
        ref:'Category',
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
    shipping:{
        type:Boolean,

    },



},{timestamps:true});//stores time at which product was created

export default mongoose.model('Products',productSchema);