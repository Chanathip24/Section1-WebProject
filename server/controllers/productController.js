const db = require("../config/db.js");
//create
//update
exports.updateProduct = (req, res) => {
  const productId = req.params.id; // Get the product ID from URL parameters
  const { product_name, description, price, stock } = req.body;

  // Expecting categories to be provided in the body as an array
  const categories = [req.body.category, req.body.sub_cate].filter(Boolean); // Filter out any undefined values
  const imagePaths = req.files ? req.files.map((file) => file.path) : []; // Collect image paths from uploaded files

  // Update product details query
  const query1 = `
      UPDATE products 
      SET product_name = ?, description = ?, price = ?, stock_quantity = ? 
      WHERE product_id = ?`;

  // Delete existing categories for this product
  const deleteCategoriesQuery =
    "DELETE FROM product_categories WHERE product_id = ?";

  // Insert new categories
  const insertCategoriesQuery =
    "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)";

  // Delete existing images for this product
  const deleteImagesQuery = "DELETE FROM images WHERE product_id = ?";

  // Insert new images
  const insertImagesQuery =
    "INSERT INTO images (image_url, product_id) VALUES (?, ?)";

  // Update the product
  db.query(
    query1,
    [product_name, description, price, stock, productId],
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error updating product", details: err });

      // Delete existing categories
      db.query(deleteCategoriesQuery, [productId], (err) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Error deleting categories", details: err });

        // Insert new categories
        categories.forEach((category) => {
          db.query(insertCategoriesQuery, [productId, category], (err) => {
            if (err)
              return res
                .status(500)
                .json({ error: "Error inserting category", details: err });
          });
        });

        // Delete existing images
        db.query(deleteImagesQuery, [productId], (err) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Error deleting images", details: err });

          // Insert new images
          imagePaths.forEach((imagePath) => {
            db.query(insertImagesQuery, [imagePath, productId], (err) => {
              if (err)
                return res
                  .status(500)
                  .json({ error: "Error inserting image", details: err });
            });
          });

          // Final response
          res
            .status(200)
            .json("Product, categories, and images updated successfully!");
        });
      });
    }
  );
};
exports.createProduct = (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const categories = [req.body.category, req.body.sub_cate].filter(Boolean); // Filter out any undefined or empty values
  const imagePaths = req.files.map((file) => file.path);

  // Insert product details into the products table
  const query =
    "INSERT INTO products (product_name, description, price, stock_quantity) VALUES (?, ?, ?, ?)";

  // Insert category to product in the product_categories table
  const query2 =
    "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)";

  // Insert image URLs into the images table
  const query3 = "INSERT INTO images (image_url, product_id) VALUES (?, ?)";

  // Execute the first query
  db.query(query, [product_name, description, price, stock], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Product ID for the new product
    const productId = result.insertId;

    // Insert each category
    for (let i = 0; i < categories.length; i++) {
      db.query(query2, [productId, categories[i]], (err) => {
        if (err) return res.status(500).json({ error: err });
      });
    }

    // Insert each image one by one
    for (let i = 0; i < imagePaths.length; i++) {
      db.query(query3, [imagePaths[i], productId], (err) => {
        if (err) return res.status(500).json({ error: err });

        // If we're on the last image, send a success response
        if (i === imagePaths.length - 1) {
          res.status(200).json({ message: "Product created successfully" });
        }
      });
    }
  });
};

//get 1 product by id
exports.getoneProduct = (req, res) => {
  const { id } = req.params;

  // SQL query to join products, product_categories, categories, and images
  const query = `
      SELECT 
        products.product_id,
        products.product_name,
        products.description,
        products.price,
        products.stock_quantity,
        product_categories.category_id,
        category.category_name,
        images.image_url
      FROM 
        products
      LEFT JOIN 
        product_categories ON products.product_id = product_categories.product_id
      LEFT JOIN 
        category ON product_categories.category_id = category.category_id
      LEFT JOIN 
        images ON products.product_id = images.product_id
      WHERE 
        products.product_id = ?`;

  // Execute the query
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Check if product exists
    if (result.length === 0)
      return res.status(404).json({ message: "Product not found" });

    // Using .map() to gather unique category names and image URLs
    const categories = [
      ...new Set(result.map((row) => row.category_name).filter((name) => name)),
    ]; // Unique category names
    const images = result.map((row) => row.image_url).filter((url) => url); // Image URLs

    const productData = {
      product_id: result[0].product_id, // Include product_id
      product_name: result[0].product_name,
      description: result[0].description,
      price: result[0].price,
      stock_quantity: result[0].stock_quantity,
      categories,
      images,
    };

    res.status(200).json(productData);
  });
};

//getallproduct
exports.getallProduct = (req, res) => {
  // query
  const query = `
      SELECT 
        products.product_id,
        products.product_name,
        products.description,
        products.price,
        products.stock_quantity,
        product_categories.category_id,
        category.category_name,
        images.image_url
      FROM 
        products
      LEFT JOIN 
        product_categories ON products.product_id = product_categories.product_id
      LEFT JOIN 
        category ON product_categories.category_id = category.category_id
      LEFT JOIN 
        images ON products.product_id = images.product_id`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // store
    const productsMap = {};

    // store each product to map
    result.forEach((row) => {
      const {
        product_id,
        product_name,
        description,
        price,
        stock_quantity,
        category_id,
        category_name,
        image_url,
      } = row;

      // create product
      if (!productsMap[product_name]) {
        productsMap[product_name] = {
          product_id,
          product_name,
          description,
          price,
          stock_quantity,
          categories: [], // Change to store category names
          images: [],
        };
      }

      // Add category name if it exists
      if (category_name) {
        productsMap[product_name].categories.push(category_name); // Store category name instead of ID
      }
      if (image_url) {
        productsMap[product_name].images.push(image_url);
      }
    });

    // Convert the productsMap to an array
    const productList = Object.values(productsMap);

    // Return the product list as JSON
    res.status(200).json(productList);
  });
};
