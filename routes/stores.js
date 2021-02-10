var express = require("express");
var router = express.Router();
const { STORE } = require("../models");
const multer = require('multer');
var path = require('path');
// var upload = multer({ dest: 'uploads/' });

router.get("/", async (req, res) => {
    try {
        let data = await STORE.find({});
        res.render("stores", { data });
    } catch (error) {
        res.render("error");
    }
});
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({ storage });

router.post('/uploads', upload.single("storeImage"), async (req, res) => {
    try {
        const { storeName, storeContact, storeAddress } = req.body;
        const { storeImage } = req.file.filename;
        console.log(req.body);
        let store = await STORE.findOne({ storeName, storeContact, storeAddress, storeImage });
        if (store) {
            return res.send('Store already exists, please update it');
        }
        store = new STORE({ storeName, storeContact, storeAddress, storeImage });
        await store.save();
        res.render('store', {
            storeImage: `/uploads/${req.file.filename}`
        });
        res.redirect('/stores');

    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await STORE.findById(id);
        if (data) {
            return res.render('store-page', { data });
        }
        res.render('error');
    } catch (error) {
        res.render('error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const store = await STORE.findById(id);
        if (!store) {
            return res.render('error');
        }
        await store.delete();
        res.redirect('/stores');
    } catch (error) {
        res.render(error);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await STORE.findById(id);
        if (!data) {
            res.render('error');
        }
        res.render('store-edit', { data });
    } catch (error) {
        res.render('error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { storeName, storeContact, storeAddress, storeImage } = req.body;
        await STORE.findByIdAndUpdate(id, req.body);
        res.redirect(`/stores/${id}`);
    } catch (error) {
        res.render('error');

    }
});

module.exports = router;
