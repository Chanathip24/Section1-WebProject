const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js");
const { updateProduct, createProduct, getoneProduct, getallProduct, deleteProduct,searchProductbynames,searchProducts } = require("../controllers/productController.js");

//get 1 product
router.get("/product/:id",getoneProduct );

//get all product
router.get("/getall", getallProduct);

//create product
router.post("/create", upload.array("images", 4),createProduct );

//product search by name
router.get("/search/:name", searchProductbynames);

//product search by name,max,min price,best seller
//localhost:5001/product/search?name=productname&minPrice=10&maxPrice=100&bestSeller=true
router.get("/search", searchProducts);

// Edit product
router.put("/edit/:id", upload.array('images', 4), updateProduct);

//delete product
router.delete("/delete/:id", deleteProduct)

module.exports = router;
