const mongoose = require('mongoose');

const productInfoSchema = new mongoose.Schema({
    id: String,
    createAt: { type: Date, default: Date.now }
}, { collection: 'productInfo' });

module.exports = mongoose.model('productInfo', productInfoSchema);