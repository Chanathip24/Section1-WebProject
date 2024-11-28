const express = require("express");
const router = express.Router();

const {
  getAllOrder,
  getOrderByID,
  updateOrderStatus,
  deleteOrders,
  createOrder,
} = require("../controllers/orderController");
const { checkToken } = require("../middlewares/checkToken");
const {
  userAllOrder,
  userOrderByID,
} = require("../controllers/userorderController");
//get order
router.get("/allorders", getAllOrder);

//get order by id
router.get("/orderbyid/:order_id", getOrderByID);

//update status order
router.put("/updatestatus/:order_id", updateOrderStatus);

//createorder
router.post("/addorder", createOrder);

//delete order
router.delete("/deleteorder/:order_id", deleteOrders);

//for user /order
router.get("/user/orders", checkToken, userAllOrder);
router.get("/user/orders/:order_id", checkToken, userOrderByID);

module.exports = router;
