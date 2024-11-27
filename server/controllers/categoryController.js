const db = require("../config/db");

exports.getAllCategory = (req, res) => {
  const query = "SELECT category_id,category_name from category";
  db.query(query, (err, data) => {
    if (err) res.status(500).json(err);
    res.json(data);
  });
};
exports.createCategory = (req, res) => {
  const { category_name } = req.body; // Get category name from request body
  const query = "INSERT INTO category (category_name) VALUES (?)";

  db.query(query, [category_name], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("Category created successfully!");
  });
};

exports.updateCategory = (req, res) => {
  const categoryId = req.params.id; // Get category ID from URL parameters
  const { category_name } = req.body; // Get new category name from request body
  const query = "UPDATE category SET category_name = ? WHERE category_id = ?";

  db.query(query, [category_name, categoryId], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Category updated successfully!");
  });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id; // Get category ID from URL parameters
  const query = "DELETE FROM category WHERE category_id = ?";

  db.query(query, [categoryId], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Category deleted successfully!");
  });
};
