const express = require("express");
const router = express.Router();


const { getAllCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController.js");
router.get("/getall",getAllCategory );

router.post("/create",createCategory );

router.put("/update/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;
