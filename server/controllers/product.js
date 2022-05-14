const Product = require("../models/product");
exports.createProduct = async (req, res) => {
  try {
    // Must receive array of categories mandatory and additionals array not mandatory
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).send({ product });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};


exports.getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.profilePhoto) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(product.profilePhoto);
  } catch (error) {
    res.status(404).send();
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send({ products });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
exports.fetchMyProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).send({ products: products });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send({ product });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

exports.countProducts = async (req, res) => {
  try {
    const countProducts = await Product.find({}).countDocuments();
    res.status(200).send({ countProducts });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};

exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "basePrice"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Campo inválido!" });
  }

  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("No se ha encontrado el producto");
    }
    await product.remove();

    res.status(200).send({ result: "ok" });
  } catch (e) {
    res.status(500).send();
  }
};
