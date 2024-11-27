const db = require("../config/db");

//Get all order where user own
exports.userAllOrder = (req, res) => {
  const userID = req.user.id;
  const query = "SELECT * FROM orders where user_id = ?";
  const query2 = "SELECT * FROM Order_Items where order_id = ?";

  db.query(query, [userID], async (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result.length === 0)
      return res.status(404).json({ msg: "No orders found." });

    try {
      //with their items
      const data = await Promise.all(
        result.map((item) => {
          return new Promise((resolve, reject) => {
            db.query(query2, [item.order_id], (err, result) => {
              if (err) return reject(err);
              resolve({ ...item, orders: result });
            });
          });
        })
      );
      res.status(200).json({ msg: "Success", orders: data });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

//Get order by ID where user own
exports.userOrderByID = (req, res) => {
  const userID = req.user.id;
  //order id
  const id = req.params.order_id;

  const query = "SELECT * FROM orders where order_id = ? AND user_id = ?";
  const query2 = "SELECT * FROM Order_Items where order_id = ?";

  db.query(query, [id, userID], async (err, order) => {
    if (err) return res.status(500).json({ msg: "Failed to get order", err });
    if (order.length === 0)
      return res.status(404).json({ msg: "No order found" });
    //all product id
    const allid = [];
    try {
      const data = await new Promise((resolve, reject) => {
        db.query(query2, [order[0].order_id], (err, result) => {
          if (err) return reject(err);
          resolve({ ...order[0], order: result });
        });
      });

      //get product name
      if (data.order.length > 0) {
        data.order.forEach((element) => {
          allid.push(element.product_id);
        });
      }

      //allid to get product name
      const product_name = await Promise.all(
        allid.map((item) => {
          
          return new Promise((resolve, reject) => {
            db.query(
              "select product_name from products where product_id = ?",
              [item],
              (err, result) => {
                if (err) reject(err);
 
                resolve({product_id : item,name : result[0].product_name});
              }
            );
          });
        })
      );
      res.json({ msg: "Success", order: data, product_name: product_name });
    } catch (error) {
      return res.status(500).json({ msg: "Server err", error });
    }
  });
};
