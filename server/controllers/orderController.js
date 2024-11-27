const db = require("../config/db");

//Get all order
exports.getAllOrder = (req, res) => {
  const query = "SELECT * FROM orders";
  const query2 = "SELECT * FROM Order_Items where order_id = ?";

  db.query(query, async (err, result) => {
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
      res.status(200).json({ orders: data });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

//Get order by ID
exports.getOrderByID = (req, res) => {
  //order id
  const id = req.params.order_id;

  const query = "SELECT * FROM orders where order_id = ?";
  const query2 = "SELECT * FROM Order_Items where order_id = ?";

  db.query(query, [id], async (err, order) => {
    if (err) return res.status(500).json({ msg: "Failed to get order", err });
    if (order.length === 0)
      return res.status(404).json({ msg: "No order found" });

    try {
      const data = await new Promise((resolve, reject) => {
        db.query(query2, [order[0].order_id], (err, result) => {
          if (err) return reject(err);
          resolve({ ...order[0], order: result });
        });
      });
      res.json({ msg: "Success", order: data });
    } catch (error) {
      return res.status(500).json({ msg: "Server err", error });
    }
  });
};

//update order status
exports.updateOrderStatus = (req, res) => {
  //product
  const id = req.params.order_id;
  //status PENDING', 'COMPLETED', 'CANCELLED'
  const { status } = req.body;

  //validation status
  if (!status)
    return res.status(404).json({ msg: "Please add status to update." });

  const query = "UPDATE orders set status = ? where order_id = ?";

  db.query(query, [status, id], (err, result) => {
    if (err) return res.status(500).json({ msg: "Server error", err });
    if (result.affectedRows === 0)
      return res.status(404).json({ msg: "No order found" });
    return res.json({
      msg: `Update order id ${id} to status ${status} successfully `,
    });
  });
};
//create order


//promise for query
const queryPromise = (query, values) =>
  new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });


//create order
//update sold quantity and decreate stock


exports.createOrder = async (req, res) => {
  const { total_amount, user_id, product } = req.body;

  try {
    const orderResult = await queryPromise(
      "INSERT INTO orders(total_amount, user_id) VALUES(?, ?)",
      [total_amount, user_id]
    );
    const orderId = orderResult.insertId;

    //insert product to orders item
    const productPromises = product.map((item) =>
      queryPromise(
        "INSERT INTO Order_Items(quantity, order_id, product_id) VALUES(?, ?, ?)",
        [item.quantity, orderId, item.product_id]
      )
    );
    await Promise.all(productPromises);

    //update product quantity and sold_quantity
    const productUpdate = product.map((item)=>{
      queryPromise("UPDATE products SET stock_quantity = stock_quantity - ?,sold_quantity = sold_quantity + ? WHERE product_id = ?",[item.quantity,item.quantity,item.product_id])
    })
    await Promise.all(productUpdate)

    res.json({ msg: "Create order success", orderID: orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

//delete order
exports.deleteOrders = (req, res) => {
  const id = req.params.order_id;

  const query = "DELETE FROM orders where order_id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ msg: "Delete failed", err });
    if (result.affectedRows === 0)
      return res.status(404).json({ msg: `No order ${id} found` });
    res.json({ msg: `Delete order id ${id} success.` });
  });
};
