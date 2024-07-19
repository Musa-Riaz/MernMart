const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductsController,
  getSingleProductController,
  updateProductController,
  productPhotoController,
  deleteProductController
} = require("../controllers/productController");
const formidable = require("express-formidable");

router.post('/create-product', requireSignIn, formidable() ,createProductController);

router.get('/get-product', getProductsController);

router.get('/get-product/:slug', getSingleProductController);

router.get('/product-photo/:pid', productPhotoController);

router.put('/update-product/:pid', requireSignIn, formidable(), updateProductController);

router.delete('/delete-product/:id',  deleteProductController);
module.exports = router;