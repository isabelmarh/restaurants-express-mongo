const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: ['Please enter the restaurant name']
    },
    image: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: ['Please enter the phone number']
    },
    description: {
        type: String,
    },
    location: {
        type: String,

    },
    image: {
        type: String
    },

    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('RESTAURANT', restaurantSchema);

