const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./restaurant");
const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Nombre muy corto"],
      maxlength: [100, "Nombre muy largo"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [800, "Descripción demasiado larga"],
    },
    basePrice: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) {
          throw new Error("El precio es incorrecto");
        }
        if (value > 1000000) {
          throw new Error("Precio máximo 1000000");
        }
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    

    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productsSchema.statics.findProducts = async (products, query) => {
  const queryToLowerCase = query.toLowerCase();

  const foundedProductsByName = products.filter((p) =>
    p.name.toLowerCase().includes(queryToLowerCase)
  );
  const foundedProductsByDescription = products.filter((p) =>
    p.description.toLowerCase().includes(queryToLowerCase)
  );

  const allProducts = foundedProductsByName.concat(
    foundedProductsByDescription
  );

  const foundedProducts = allProducts.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  if (!foundedProducts) {
    throw new Error("No se encontraron productos con '" + query + "'");
  }

  return foundedProducts;
};

productsSchema.methods.toJSON = function () {
  const products = this;
  const productsObject = products.toObject();

  delete productsObject.v;
  delete productsObject.createdAt;
  delete productsObject.updatedAt;

  return productsObject;
};

productsSchema.statics.findByName = async (name) => {
  const products = await Product.findOne({ name });

  if (!products) {
    throw new Error("No se encontraron " + name);
  }

  return products;
};

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
