const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.LOCALMONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = db;