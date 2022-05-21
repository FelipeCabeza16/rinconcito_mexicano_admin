const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TableStatus = require('./tableStatus')
const config = require('../config')

const Counter = require("./counter");


const tablesSchema = new Schema(
  {
    // History of the table
    number: {
      type: Number,
    },
    tableStatues: [{
      type: Schema.Types.ObjectId,
      ref: "TableStatus",
      required: true,
    }],
    isAvailable: {
      type: Boolean,
      default: true,      
    }, 
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

tablesSchema.methods.toJSON = function () {
  const table = this;
  const tableObject = table.toObject();

  delete tableObject.updatedAt;

  return tableObject;
};

tablesSchema.methods.addFinishDateLastStatus = async function () {
  const table = this;
  const lastStatus = table.tableStatues[table.tableStatues.length - 1];
  const lastTableStatus = await TableStatus.findById(lastStatus);
  lastTableStatus.finishAt.push(Date.now());
  // GET THE LAST STATUS AND PUSH FINISH DATE NOW
  await lastTableStatus.save();
  await table.save();  
}

tablesSchema.methods.isTheTableAvailable = async function () {
  const table = this;
  const lastStatus = table.tableStatues[table.tableStatues.length - 1];
  const lastTableStatus = await TableStatus.findById(lastStatus);
  return (lastTableStatus.status === config.TABLE_AVAILABLE && table.isAvailable) ;
}

tablesSchema.methods.isTheTableOccupy = async function () {
  const table = this;
  const lastStatus = table.tableStatues[table.tableStatues.length - 1];
  const lastTableStatus = await TableStatus.findById(lastStatus);
  return (lastTableStatus.status === config.TABLE_OCCUPY && table.isAvailable) ;
}

tablesSchema.methods.isTheTableNotAvailable = async function () {
  const table = this;
  const lastStatus = table.tableStatues[table.tableStatues.length - 1];
  const lastTableStatus = await TableStatus.findById(lastStatus);
  return (lastTableStatus.status === config.TABLE_NOT_AVAILABLE && !table.isAvailable) ;
}

tablesSchema.methods.isTheTableBooked = async function () {
  const table = this;
  const lastStatus = table.tableStatues[table.tableStatues.length - 1];
  const lastTableStatus = await TableStatus.findById(lastStatus);
  return (lastTableStatus.status === config.TABLE_BOOKING && table.isAvailable) ;
}

// id autoincrement
tablesSchema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function(error, counter) {
      if (error)
          return next(error);
      doc.number = counter.seq;
      next();
  });
});


module.exports = mongoose.model("Table", tablesSchema);
