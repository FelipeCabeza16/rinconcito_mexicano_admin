const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});
var Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter