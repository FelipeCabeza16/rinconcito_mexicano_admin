const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

// For populate
require("./product");
require("./table");
require("./tableStatus");

const restaurantSchema = new mongoose.Schema(
  {
    document: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [3, "Documento incorrecto"],
      maxlength: [50, "Documento muy largo"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Contraseña muy corta"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Nombre es muy corto, al menos 3 caracteres"],
      maxlength: [100, "Nombre es muy largo"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Descripción es muy corta, al menos 3 caracteres"],
      maxlength: [300, "Descripción es muy larga"],
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        },
      },
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      // validate: /3[0125][0-9]{8}/
      validate(value) {
        if (!value) {
          throw new Error("Número incorrecto");
        }
      },
    },
    // Every address has a city, but restaurant can have multiple addresses in multiple cities


    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "Table",
        required: true,
      },
    ],

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.methods.generateAuthToken = async function () {
  const restaurant = this;

  const token = jwt.sign(
    { _id: restaurant._id.toString() },
    config.JWT_SECRET
    // { expiresIn: "1h" }
  );

  restaurant.tokens = restaurant.tokens.concat({ token });
  await restaurant.save();

  return token;
};

restaurantSchema.methods.toJSON = function () {
  const restaurant = this;
  const restaurantObject = restaurant.toObject();

  delete restaurantObject.password;
  delete restaurantObject.tokens;
  delete restaurantObject.createdAt;
  delete restaurantObject.updatedAt;

  return restaurantObject;
};

restaurantSchema.statics.findByDocument = async (document) => {
  try {
    const restaurant = await restaurant.findOne({ document });
    if (!restaurant) {
      throw new Error("Restaurante con " + document + " no encontrado!!");
    }
    return restaurant;
  } catch (error) {
    throw new Error("Restaurante con " + document + " no encontrado!!");

  }
};

restaurantSchema.statics.findByPhone = async (phone) => {
  try {
    const restaurant = await restaurant.findOne({ phone });
    if (!restaurant) {
      throw new Error("Restaurante con " + phone + " no encontrado!!");
    }
    return restaurant;
  } catch (error) {
    throw new Error("No se ha encontrado el número " + phone);
  }
};

restaurantSchema.methods.toJSON = function () {
  const restaurant = this;
  const restaurantObject = restaurant.toObject();

  delete restaurantObject.v;
  delete restaurantObject.createdAt;
  delete restaurantObject.updatedAt;
  delete restaurantObject.tokens;

  return restaurantObject;
};

restaurantSchema.statics.changePassword = async (
  document,
  oldPassword,
  newPassword
) => {
  const restaurant = await Restaurant.findOne({ document });
  if (!restaurant) {
    throw new Error("Ocurrió un error, vuelve a intentarlo de nuevo");
  }

  const isMatch = await bcrypt.compare(oldPassword, restaurant.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }
};

restaurantSchema.statics.findByCredentials = async (username, password) => {
  debugger;
  const restaurant = await Restaurant.findOne({
    $or: [{ document: username }, { phone: username }, { email: username }],
  })
    .populate("products")
    .populate({
      path: "tables",
      populate: {
        path: "tableStatues",
      }
    });

  if (!restaurant) {
    throw new Error("Credenciales incorrectas");
  }

  const isMatch = await bcrypt.compare(password, restaurant.password);

  if (!isMatch) {
    throw new Error("Credenciales incorrectas");
  }

  return restaurant;
};

// Hash the plain text password before saving
restaurantSchema.pre("save", async function (next) {
  const restaurant = this;

  if (restaurant.isModified("password")) {
    restaurant.password = await bcrypt.hash(restaurant.password, 8);
  }

  next();
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
