const { default: slugify } = require('slugify');
const productModel = require('../models/productModel');
const fs = require('fs');

exports.createProductController = async (req, res) => {
    try{
    
        const {name, slug ,description, price, category, quantity} = req.fields;
        const {photo} = req.files;
       
        switch(true){
            case !name:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a name'    
                })
            case !description:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a description'
                })
            case !price:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a price'
                })
            case !category:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a category'
                })
            case photo && photo.size > 2000000:
                return res.status(500).json({
                    status:'fail',
                    message:'Photo is required and must be less than 2 mb'
                })
            
        }

        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            products
    })
} 
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in create product controller'
    })
 }
}


//get all products

exports.getProductsController = async (req, res) => {
    try{

        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createAt:-1}); //select('-photo') is used to exclude the photo field from the response
        res.status(200).json({
            status: 'success',
            products
        })

    }catch(err){
        consooe.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in get all products controller'
        })
    }
}

//get single product

exports.getSingleProductController = async (req, res) => {
    try{
        const product = await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category');
        res.status(200).json({
            status: 'success',
            product
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in get single product controller'
        })
    }
}

//get product photo
exports.productPhotoController = async (req, res) => {
    try{

        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in product photo controller',
            err
        })
    }
}

//update products
exports.updateProductController = async (req, res) =>{
    try{
    
        const {name, slug ,description, price, category, quantity} = req.fields;
        const {photo} = req.files;
       
        switch(true){
            case !name:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a name'    
                })
            case !description:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a description'
                })
            case !price:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a price'
                })
            case !category:
                return res.status(500).json({
                    status:'fail',
                    message:'Please provide a category'
                })
            case photo && photo.size > 2000000:
                return res.status(500).json({
                    status:'fail',
                    message:'Photo is required and must be less than 2 mb'
                })
            
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new:true});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).json({
            status: 'success',
            message: 'Product updated successfully',
            products
    })
} 
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in update product controller'
    })
 }
}


//get all products

exports.getProductsController = async (req, res) => {
    try{

        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createAt:-1}); //select('-photo') is used to exclude the photo field from the response
        res.status(200).json({
            status: 'success',
            products
        })

    }catch(err){
        consooe.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in get all products controller'
        })
    }
}

//delete products

exports.deleteProductController =async (req, res) =>{
    try{
        const {id} = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
    })
}
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: 'Error in delete product controller'
        })
    }
}

