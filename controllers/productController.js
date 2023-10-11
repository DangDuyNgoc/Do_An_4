import slugify from "slugify";
import fs from "fs";

import productModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const { 
            name,
            slug,
            description,
            price,
            category,
            quantity,
            shipping
        } = req.fields;
        const { image } = req.fields;

        if(!name) {
            return res.status(400).send({ error: 'Name is required' });
        }
        if(!description) {
            return res.status(400).send({ error: 'Description is required' });
        }
        if(!price) {
            return res.status(400).send({ error: 'price is required' });
        }
        if(!category) {
            return res.status(400).send({ error: 'category is required' });
        }
        if(!quantity) {
            return res.status(400).send({ error: 'quantity is required' });
        }
        if(image && image.size > 1000000) {
            return res.status(400).send({ error: 'Image is Required and should be less then 1mb' });
        }

        const products = new productModel({ ...req.fields, slug:slugify(name) });
        if(image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }

        await products.save();
        res.status(200).send({
            success: true,
            message: 'Product Created Successfully',
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Category",
            error: error
        });
    }
};

// update product
export const updateProduct = async (req, res) => {
    try {
        const { 
            name,
            slug,
            description,
            price,
            category,
            quantity,
            shipping
        } = req.fields;
        const { image } = req.fields;

        if(!name) {
            return res.status(400).send({ error: 'Name is required' });
        }
        if(!description) {
            return res.status(400).send({ error: 'Description is required' });
        }
        if(!price) {
            return res.status(400).send({ error: 'price is required' });
        }
        if(!category) {
            return res.status(400).send({ error: 'category is required' });
        }
        if(!quantity) {
            return res.status(400).send({ error: 'quantity is required' });
        }
        if(image && image.size > 1000000) {
            return res.status(400).send({ error: 'Image is Required and should be less then 1mb' });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid
            {
                ...req.fields,
                slug:slugify(name)
            }, 
            { new: true }    
        );
        if(image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }

        await products.save();
        res.status(200).send({
            success: true,
            message: 'Product Created Successfully',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Product",
            error: error
        });
    }
}

// get all products
export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select('-image')
            .limit(12)
            .sort({createdAt:-1});

        res.status(200).send({
            success: true,
            countProduct: products.length,
            message: 'Products List',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Product",
            error: error
        });
    } 
};

// get single product
export const getSingleProduct = async (req, res) => {
    try {   
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select('-image')
            .populate('category');

        res.status(200).send({
            success: true,
            message: "Get Single Product Successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Product",
            error: error
        });
    }
};

export const getProductImage = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('image')
        if(product.image.data) {
            res.set("Content-type", product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get Image Product",
            error: error
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-image');
        res.status(200).send({
            success: true,
            message: 'Deleted Product SuccessFully'

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Product",
            error: error
        });
    }
}