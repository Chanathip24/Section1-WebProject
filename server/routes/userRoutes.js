const express = require("express");
const router = express.Router();

const { checkToken } = require("../middlewares/checkToken.js");

//controller import
const { checkLogin,userLogout,userLogin,userRegister } =  require("../controllers/userController.js");

const { adminRegister,getAlluser,deleteUser, getUserById, adminManageUser } = require("../controllers/adminController.js");


//all route //////////
//checklogin
router.get("/checklogin", checkToken, checkLogin);
//logout
router.get("/logout", checkToken, userLogout);

//login
router.post("/login", userLogin );
//register for frontend
router.post("/register",userRegister );



//get all users data
router.get("/getall", checkToken,getAlluser );
//get by id
router.get("/getuser/:id",checkToken,getUserById);
//delete user
router.delete("/delete/:id", deleteUser);
//register for admin
router.post("/registeradmin",checkToken, adminRegister);
//update
router.put("/updateuser/:id",checkToken,adminManageUser)

module.exports = router;
