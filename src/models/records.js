const mongoose = require('../utils/mongoose-config-manager');

const { Schema } = mongoose;

// Record Schema
const RecordsSchema = new Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],
});

module.exports = mongoose.model('records', RecordsSchema);