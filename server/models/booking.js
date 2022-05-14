const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

// For populate
require("./client");
require("./product");
require("./table");

const bookingSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    table: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },


    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.methods.toJSON = function () {
  const booking = this;
  const bookingObject = booking.toObject();

  delete bookingObject.createdAt;
  delete bookingObject.updatedAt;

  return bookingObject;
};

bookingSchema.methods.calculatePrice = async function () {
  const booking = this;
  const products = [];
  let total = 0;
  for (let i = 0; i < booking.products.length; i++) {
    const product = await Product.findById(booking.products[i]);    
    total += product.product.price * product.product.price * product.quantity;
  }
  booking.price = total;
  await booking.save();
  return booking.price;
};

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
