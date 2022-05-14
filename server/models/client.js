const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema(
  {

    document: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [3, "Documento no válido"],
      maxlength: [50, "Documento no válido"],
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "El nombre es muy corto"],
      maxlength: [100, "El nombre es muy largo"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Apellido muy corto"],
      maxlength: [100, "Apellido muy largo"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // validate: /3[0125][0-9]{8}/
      validate(value) {
        if (!value) {
          throw new Error("Ingresa tú número de teléfono");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);


clientSchema.methods.toJSON = function () {
  const person = this;
  const personObject = person.toObject();

  delete personObject.password;
  delete personObject.tokens;
  delete personObject.createdAt;
  delete personObject.updatedAt;

  return personObject;
};

clientSchema.statics.findByPhone = async (phone) => {
  try {
    //FIND ONE, NOT ONLY FIND

    const person = await Client.findOne({ phone });

    if (!person) {
      throw new Error("No se ha encontrado a " + phone);
    }
    return person;
  } catch (e) {
    throw new Error("No se ha encontrado el número " + phone);
  }
};



module.exports = mongoose.model("Client", clientSchema);
