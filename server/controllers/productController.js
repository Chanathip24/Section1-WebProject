const db = require("../config/db.js");

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { product_name, description, price, stock_quantity } = req.body;

  
  const categories = [req.body.category, req.body.sub_cate].filter(Boolean);
  const imagePaths = req.files ? req.files.map((file) => file.path) : [];

  const updateProductQuery = `
    UPDATE products 
    SET product_name = ?, description = ?, price = ?, stock_quantity = ? 
    WHERE product_id = ?`;

  const deleteCategoriesQuery =
    "DELETE FROM product_categories WHERE product_id = ?";
  const insertCategoriesQuery =
    "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)";
  const deleteImagesQuery = "DELETE FROM images WHERE product_id = ?";
  const insertImagesQuery =
    "INSERT INTO images (image_url, product_id) VALUES (?, ?)";

  // Update product details
  db.query(
    updateProductQuery,
    [product_name, description, price, stock_quantity, productId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error updating product", details: err });
      }

      // if categories is send from form
      if (categories.length > 0) {
        // Delete old categories
        db.query(deleteCategoriesQuery, [productId], (err) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error deleting categories", details: err });
          }

          // Insert new categories
          let categoriesProcessed = 0;
          categories.forEach((category) => {
            db.query(insertCategoriesQuery, [productId, category], (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Error inserting category", details: err });
              }
              categoriesProcessed++;
              if (categoriesProcessed === categories.length) {
                // Proceed to images after all categories are processed
                handleImageUpdate();
              }
            });
          });
        });
      } else {
        // If no categories to update, proceed directly to image handling
        handleImageUpdate();
      }
    }
  );

  // Function to delete and update images
  function handleImageUpdate() {
    if (imagePaths.length > 0) {
      // Delete existing images
      db.query(deleteImagesQuery, [productId], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error deleting images", details: err });
        }

        // Insert new images
        let imagesProcessed = 0;
        imagePaths.forEach((imagePath) => {
          db.query(insertImagesQuery, [imagePath, productId], (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error inserting image", details: err });
            }
            imagesProcessed++;
            if (imagesProcessed === imagePaths.length) {
              res
                .status(200)
                .json("Product, categories, and images updated successfully!");
            }
          });
        });
      });
    } else {
      // If no images to insert, send response
      res.status(200).json("Product updated successfully!");
    }
  }
};

exports.createProduct = (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const categories = [req.body.category, req.body.sub_cate].filter(Boolean);
  const imagePaths = req.files.map((file) => file.path);

  // Insert product details into the products table
  const query =
    "INSERT INTO products (product_name, description, price, stock_quantity) VALUES (?, ?, ?, ?)";

  db.query(query, [product_name, description, price, stock], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const productId = result.insertId;

    for (let i = 0; i < categories.length; i++) {
      const query2 =
        "INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)";
      db.query(query2, [productId, categories[i]], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        //console.log("category", result);
      });
    }
    //console.log("This is img path :======== ", imagePaths);
    // if category is all insert it will go to image insert
    for (let j = 0; j < imagePaths.length; j++) {
      //console.log(imagePaths[j]);
      const query3 = "INSERT INTO images (image_url, product_id) VALUES (?, ?)";
      db.query(query3, [imagePaths[j], productId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        //console.log("img ", result);
      });
    }
    res.status(200).json({ message: "Product created successfully" });
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
        products.sold_quantity,
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
    const images = [
      ...new Set(result.map((row) => row.image_url).filter((url) => url)),
    ];

    const productData = {
      product_id: result[0].product_id, // Include product_id
      product_name: result[0].product_name,
      description: result[0].description,
      price: result[0].price,
      stock_quantity: result[0].stock_quantity,
      sold_quantity: result[0].sold_quantity,
      categories,
      images,
    };

    res.status(200).json(productData);
  });
};


//GET search product by name
exports.searchProductbynames = (req, res) => {
  const { name } = req.params;
  const query = "SELECT * FROM products WHERE product_name LIKE ?";
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};

//GET search product by name,max,min price,best seller 
exports.searchProducts = (req, res) => {
  const { name, minPrice, maxPrice, bestSeller } = req.query;
  
  let query = `
    SELECT 
      products.product_id,
      products.product_name, 
      products.description,
      products.price,
      products.stock_quantity,
      products.sold_quantity
    FROM products
    WHERE 1=1
  `;
  
  const queryParams = [];

  // Add name filter if provided
  if (name) {
    query += ` AND product_name LIKE ?`;
    queryParams.push(`%${name}%`);
  }

  // Add price range filter if provided
  if (minPrice) {
    query += ` AND price >= ?`;
    queryParams.push(minPrice);
  }
  if (maxPrice) {
    query += ` AND price <= ?`;
    queryParams.push(maxPrice);
  }

  // Add best seller filter if requested
  if (bestSeller === 'true') {
    query += ` ORDER BY sold_quantity DESC LIMIT 10`;
  }

  db.query(query, queryParams, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) {
      return res.status(404).json({ message: "No products found matching criteria" });
    }
    res.status(200).json(result);
  });
};


// Get all products
exports.getallProduct = (req, res) => {
  // Query
  const query = `
      SELECT 
        products.product_id,
        products.product_name,
        products.description,
        products.price,
        products.stock_quantity,
        products.sold_quantity,
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

    const productsMap = {};

    result.forEach((row) => {
      const {
        product_id,
        product_name,
        description,
        price,
        stock_quantity,
        sold_quantity,
        category_name,
        image_url,
      } = row;

      // Check if product already exists in the map
      if (!productsMap[product_id]) {
        productsMap[product_id] = {
          product_id,
          product_name,
          description,
          price,
          stock_quantity,
          sold_quantity,
          categories: [], // Store category names
          images: [], // Store image URLs
        };
      }

      // **Modified: Add unique categories and images**
      const product = productsMap[product_id];

      if (category_name && !product.categories.includes(category_name)) {
        product.categories.push(category_name);
      }

      // check img unique first and push
      if (image_url && !product.images.includes(image_url)) {
        product.images.push(image_url);
      }
    });

    // Convert json array
    const productList = Object.values(productsMap);

    res.status(200).json(productList);
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  //delete
  const query = "DELETE FROM products where product_id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0)
      return res.status(404).json("No product with this id");
    return res.status(200).json("Delete product success");
  });
};
