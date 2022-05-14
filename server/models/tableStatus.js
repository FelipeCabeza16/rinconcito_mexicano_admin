const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATED BY SYSTEM ADMIN
const tablesStatusSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [800, "Descripción demasiado largo"],
    },
    // If status is for example, busy, can calculates time busy if we have both dates, 
    startAt: [{
      type: Date,      
    }],
    finishAt: [{
      type: Date,
    }],
  },

);

tablesStatusSchema.methods.toJSON = function () {
  const tableStatus = this;
  const tableStatusObject = tableStatus.toObject();

  delete tableStatusObject.updatedAt;

  return tableStatusObject;
};

module.exports = mongoose.model("TableStatus", tablesStatusSchema);
