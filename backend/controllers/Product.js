const Product = require("../model/Product");

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (req, res) => {
  Product.find().then((products) => res.json(products));
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(() => res.status(404).json({ message: "Product not find!" }));
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        product.remove();
        res.json({ message: "Product was been deleted" });
      }
    })
    .catch(() => res.status(404).json({ message: "Product not find!" }));
};

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = (req, res) => {
  const product = new Product({
    name: "Sample",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "Sample desc",
    price: 10,
    countInStock: 10,
    numReviews: 0,
  });

  product.save().then((createdProduct) => {
    res.status(201).json(createdProduct);
  });
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = (req, res) => {
  const { name, image, description, price, countInStock } = req.body;

  Product.findById(req.params.id).then((product) => {
    if (product) {
      (product.name = name),
        (product.image = image),
        (product.description = description),
        (product.price = price),
        (product.countInStock = countInStock)

        product.save().then((updatedProduct) => {
          res.json(updatedProduct);
        });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
