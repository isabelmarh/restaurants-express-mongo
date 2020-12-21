const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: ['Please enter a store name'],
    },
    storeContact: {
        type: Number,
        required: ['Please enter a phone number for store'],
    },
    storeAddress: {
        type: String,
    },
    storeImage: {
        type: String
    },
});

module.exports = mongoose.model('STORE', storeSchema);
