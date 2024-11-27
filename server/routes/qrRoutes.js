const express = require("express");
const router = express.Router();

const { createPromptpay } = require("../controllers/qrController");
router.post("/",createPromptpay)
module.exports = router