const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig.js");
const { updateProduct, createProduct, getoneProduct, getallProduct } = require("../controllers/productController.js");

//get 1 product
router.get("/product/:id",getoneProduct );

//get all product
router.get("/getall", getallProduct);

//create product
router.post("/create", upload.array("images", 4),createProduct );

// Edit product
router.put("/edit/:id", upload.array('images', 4), updateProduct);


module.exports = router;
