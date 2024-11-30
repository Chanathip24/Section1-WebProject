const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js");
const { updateProduct, createProduct, getoneProduct, getallProduct, deleteProduct,searchProductbynames,searchProducts } = require("../controllers/productController.js");

//get 1 product
//method : get
//URL : http://localhost:3000/product/product/1
router.get("/product/:id",getoneProduct );

//get all product
//method : get
//URL : http://localhost:3000/product/getall
router.get("/getall", getallProduct);

//create product
//method : post
//URL : http://localhost:3000/product/create
//body FORM DATA
// Key Value
//product_name ttex "check"
//description text "check"
//stock text "100"
//price text "100",
//category text "1",
//sub_cate text "5",
//images file Please upload image file
//second data
//product_name ttex "product100"
//description text "details"
//stock text "100"
//price text "150",
//category text "1",
//sub_cate text "5",
//images file Please upload image file
router.post("/create", upload.array("images", 4),createProduct );

//product search by name
//method : get
//URL : http://localhost:3000/product/search/check
router.get("/search/:name", searchProductbynames);

//product search by name,max,min price,best seller
//method : get
//URL : http://localhost:3000/product/search?name=productname&minPrice=10&maxPrice=100&bestSeller=true
router.get("/search", searchProducts);

// Edit product
//method : put
//body form-data
//for id (please check database first)
//URL: http://localhost:3000/product/edit/3 
// Key Value
//product_name text "check2"
//description text "check2"
//stock_quantity text "101"
//price text "102",
//category text "2",
//sub_cate text "7",
//images file Please upload image file
//second data
//product_name text "new_product"
//description text "new_product"
// stock_quantity text "100"
//price text "180",
//category text "2",
//sub_cate text "7",
//images file Please upload image file
router.put("/edit/:id", upload.array('images', 4), updateProduct);

//delete product
//for id (please check database first)
//method : delete
//URL : http://localhost:3000/product/delete/3
router.delete("/delete/:id", deleteProduct)

module.exports = router;
