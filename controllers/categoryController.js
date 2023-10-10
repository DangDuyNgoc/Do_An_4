import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(401).send({message: "Name is required"});
        } 

        const existingCategory = await categoryModel.findOne({ name });
        if(existingCategory) {
            return res.status(201).send({
                success: false,
                message: "Category Already Exists",
            })
        };

        const category = await new categoryModel({ name, slug:slugify(name) }).save();
        res.status(200).send({
            success: true,
            message: "Create Category Successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Category",
            error: error
        })
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        
        const category = await categoryModel.findByIdAndUpdate(
            id, 
            {name, slug:slugify(name)}, 
            {new:true}
        );

        console.log("Update Category Successfully");
        res.status(200).send({
            success: true,
            message: "Updated Category Successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Category",
            error: error
        });
    }
}