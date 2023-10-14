import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductImage,
    getSingleProduct,
    productCount,
    productFilters,
    productList,
    updateProduct 
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
// create
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProduct);

// routes
// create
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProduct);

// get all product
router.get('/get-product', getAllProduct);

// get single product
router.get('/get-product/:slug', getSingleProduct);

// get image
router.get('/product-image/:pid', getProductImage);

// delete product
router.delete('/delete-product/:pid', deleteProduct);

// filter product 
router.post('/product-filters', productFilters);

// product count
router.get('/product-count', productCount);

// product per page
router.get('/product-list/:page', productList);

export default router;