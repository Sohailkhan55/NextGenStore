import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique :true,
    },
    slug : {    //converts white space to '-' or '_' ,good for website's axios
        type: String,
        lowercase:true  //keep everything in lowercase
    }


});
export default mongoose.model('Category',categorySchema);//collection name is category and reference type is categorySchema