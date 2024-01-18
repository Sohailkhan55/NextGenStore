import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';
export const createCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "Name is required"})
        }
        const existingCategory = await categoryModel.findOne({name});   //Check if Category already exists
        if(existingCategory){
            res.status(200).send({
                success : true,
                message : 'Category already exists'
            })
        }
        const category = await new categoryModel({name,slug: slugify(name)}).save();
        res.status(201).send({
            success : true,
            message : 'New Category Created',
            category
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error in Category'
        })
    }
};

//update category
export const updateCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;//it comes from url
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});  //new is to update category page
        res.status(200).send({
            success : true,
            message:"Category updated successfully",
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
};

//get all category
export const categoryController = async (req,res) => {
    try{
        const category = await categoryModel.find({});  //find everything
        res.status(200).send({
            success : true,
            message:'All Categories List',
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all categories'
        })
    }
};

//Get Single Category
export const singleCategory = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug}); //find by slug
        res.status(200).send({
            success:true,
            message:'Get Single category successfully',
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category"
        })
    }
};

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };