const express = require("express");
const {
  getAllmail,
  createMail,
  getMailbyID,
  deleteMail,
} = require("../controllers/mailController");
const router = express.Router();

// /mail
//get all mail
router.get("/allmail", getAllmail);

//get mail by id
router.get("/mail/:id", getMailbyID);

//create mail
router.post("/mail", createMail);

//delete mail
router.delete("/mail/:id", deleteMail);

module.exports = router;
