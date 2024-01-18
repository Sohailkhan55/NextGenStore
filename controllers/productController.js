import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import orderModel from "../models/orderModel.js";
import fs from 'fs';
import braintree from 'braintree';
import dotenv from 'dotenv';

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

export const createProductController = async (req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;//by formidable
        const {photo} = req.files;
        //Validation
        switch(true){
            case !name : return res.status(500).send({error:'Name is required'});
            case !description : return res.status(500).send({error:'Description is required'});
            case !price : return res.status(500).send({error:'Price is required'});
            case !category : return res.status(500).send({error:'Category is required'});
            case !quantity : return res.status(500).send({error:'Quantity is required'});
            case photo && photo.size > 1000000://not greater than 1MB
                return res.status(500).send({error:'Photo is required and should be less than 1MB'});
        }
        const products = new productModel({...req.fields,slug:slugify(name)});//making copy of product
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success : true,
            message : 'Product created successfully',
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error in creaing product'
        })
    }
};

//get all products
export const getProductController = async (req,res) => {
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});//applying filter  //we don't want photo here,for photo we'll keep separate API,bcoz size of req size will increase
        res.status(200).send({                        //populate category bcoz we need complete info of category and not just its id
            success : true,
            countTotal : products.length,
            message : 'All Products',
            products,
            
        })
    }catch(error){                                                              //limit upto 12 products and sort
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in getting products',
            error : error.message   //optional
        })
    }
};

//get single product
export const getSingleProductController= async (req,res) => {
    try{
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success : true,
            message : 'Single product fetched',
            product
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while getting single product',
            error
        })
    }
};

//get photo
export const productPhotoController = async (req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo");//take photo only
        if(product.photo.data)
        {
            res.set('Content-type',product.photo.contentType); //set content type of response
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error while getting photo',
            error
        })
    }
};

//delete product
export const deleteProductController = async (req,res) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success : true,
            message : 'Product deleted successfully'
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

//update product
export const updateProductController = async (req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;//by formidable
        const {photo} = req.files;
        //Validation
        switch(true){
            case !name : return res.status(500).send({error:'Name is required'});
            case !description : return res.status(500).send({error:'Description is required'});
            case !price : return res.status(500).send({error:'Price is required'});
            case !category : return res.status(500).send({error:'Category is required'});
            case !quantity : return res.status(500).send({error:'Quantity is required'});
            case photo && photo.size > 1000000://not greater than 1MB
                return res.status(500).send({error:'Photo is required and should be less than 1MB'});
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});//making copy of product
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success : true,
            message : 'Product updated successfully',
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : 'Error in updating product'
        })
    }
};


//Filters
export const productFiltersController = async (req,res) => {
    try{
        const {checked,radio} = req.body;
        let args = {}               //since multiple queries,we need to check checkbox and radio both
        if(checked.length > 0){
            args.category = checked;
        }
        if(radio.length){

            args.price = {$gte : radio[0],$lte : radio[1]}
        }
        const products = await productModel.find(args); //in args,we've queries
        res.status(200).send({
            success : true,
            products
        })
    }catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error
        })
    }
};

// product count
export const productCountController = async (req,res) => {
    try{
        const total = await productModel.find({}).estimatedDocumentCount(); //return count of all documents
        res.status(200).send({
            success : true,
            total,
        })

    }catch(error){
        console.log(error);
        res.status(400).send({
            message : 'Error in product count',
            error,
            success : false
        })
    }
};

// product list based on page
export const productListController = async (req,res) => {
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products
        })
    }catch(error){
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in per page controller',
            error
        })
    }
};

// Search product
export const searchProductController = async (req,res) => {
    try{
        const {keyword}= req.params;
        const results = await productModel.find({$or:[{name :{$regex :keyword,$options : "i"}},
        {description :{$regex :keyword,$options : "i"}}
    ],
    
    }) .select("-photo") //regex to find keyword in name and description and make it case insensitive
    res.json(results);
    } catch(error){
        console.log(error);
        res.status(400).send({
            success : false,
            message : 'Error in search product api',
            error
        })
    }
};

//similar products
export const relatedProductController = async (req,res) => {
    try{
        const {pid,cid} = req.params;   //product id,category id
        const products = await productModel.find({
            category : cid,
            _id:{
                $ne:pid //not equal to 
            }
        }).select("-photo").limit(3).populate("category");//show all products of that category except current showing product,show upto 3 products
        res.status(200).send({
            success : true,
            products
        })
    }catch(error){
        console.log(error);
        res.status(400).send({
            success : false,
            message: 'Error while getting related product',
            error
        })
    }
};

//get product by category
export const productCategoryController = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug});//slug is of category
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success : true,
            category,
            products
        })
    }catch(error){
        console.log(error);
        res.status(400).send({
            success : false,
            error,
            message : 'Error while getting product'
        });
    }
};

//payment gateway api
//token
export const braintreeTokenController = async (req,res) => {
    try{
        gateway.clientToken.generate({}, function(err,response){ //get token from gateway
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        })
    }catch(error){
        console.log(error);
    }
};

//payment
export const braintreePaymentController = async (req,res) => {
    try{
        const {cart,nonce} = req.body;
        let total =0;
        cart.map((i) => {
        total += i.price;
        });
        let newTransaction = gateway.transaction.sale({ //create new transaction
            amount:total,
            paymentMethodNonce : nonce,
            options : {
                submitForSettlement : true
            }
        },
        function (error,result){
            if(result){
                const order = new orderModel({
                    products : cart,
                    payment : result,
                    buyer : req.user._id
                }).save();
                res.json({ok : true});
            }
            else{
                res.status(500).send(error);
            }
        }
        )

    }catch(error){
        console.log(error);
    }
};