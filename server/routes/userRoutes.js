const express = require("express");
const router = express.Router();

const { checkToken } = require("../middlewares/checkToken.js");

//controller import
const {
  checkLogin,
  userLogout,
  userLogin,
  userRegister,
} = require("../controllers/userController.js");

const {
  adminRegister,
  getAlluser,
  deleteUser,
  getUserById,
  adminManageUser,
  searchUsers,
  findUserByEmail
} = require("../controllers/adminController.js");

//all route //////////
//checklogin
router.get("/checklogin", checkToken, checkLogin);
//logout
router.get("/logout", checkToken, userLogout);

//register for frontend
//please comment SECTION Recaptcha before testing if not it won't work
//method : post
//body raw JSON
// {
//   "email" : "admin2@admin.com",
//   "password" : "adminadmin",
//   "fname" : "admin",
//   "lname" : "admin",
//   "address" : "adminaddress",
//   "phone" : "1234567890"
// }
router.post("/register", userRegister);

//login
//method : post
//please comment SECTION Recaptcha before testing if not it won't work
//body raw JSON
// {
//   "email" : "admin2@admin.com",
//   "password" : "adminadmin"
// }
router.post("/login", userLogin);



//CREATE USER
//need to login first to get token and need recaptcha token too
// if test need to remove checkToken Middleware and in getAlluser comment on section
//that check role :DD
//register for admin
// method : post
// url : http://localhost:3000/user/registeradmin
// body : raw JSON
//{
//  "email" : "test@email.com",
//  "fname" : "testfname",
//  "lname" : "testlname",
//  "password" : "testpassword",
//  "address" : "address",
//  "phone" : "1234567890"
//}
router.post("/registeradmin", checkToken, adminRegister);

//get all users data
//need to login first to get token and need recaptcha token too
// if test need to remove checkToken Middleware and in getAlluser comment on section
//that check role :DD 
// method : get
//URL : http://localhost:3000/user/getall
router.get("/getall", checkToken, getAlluser);


//get by id
//need to login first to get token and need recaptcha token too
// if test need to remove checkToken Middleware and in getAlluser comment on section
//that check role :DD 
// Need 1 data user in data database
// method : get
//URL : http://localhost:3000/user/getuser/1
router.get("/getuser/:id", checkToken, getUserById);

//Update user
//need to login first to get token and need recaptcha token too
// if test need to remove checkToken Middleware and in getAlluser comment on section
//that check role :DD 
// Need 1 data user in data database
//method : put
//URL : http://localhost:3000/user/updateuser/1
//body : raw JSON
// {
//   "email" : "test123@email.com",
//   "fname" : "testfname123",
//   "lname" : "testlname123",
//   "password" : "testpassword123",
//   "address" : "address123",
//   "phone" : "0123456789"
// }
router.put("/updateuser/:id", checkToken, adminManageUser);


//find user by email
//method : get
//URL : http://localhost:3000/user/finduser/test123@email.com
router.get("/finduser/:email", findUserByEmail);

//find user by email ,fname , role
//method: get
// URL : http://localhost:3000/user/search?email=test123@email.com&fname=testfname123
router.get("/search", searchUsers);

//Delete user by id
//method : delete
//URL : http://localhost:3000/user/delete/1
router.delete("/delete/:id", deleteUser);

module.exports = router;
