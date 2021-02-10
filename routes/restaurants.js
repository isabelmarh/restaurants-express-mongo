var express = require("express");
var router = express.Router();
const { RESTAURANT } = require("../models");
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get("/", async (req, res) => {
  try {
    let data = await RESTAURANT.find({});
    res.render("restaurants", { data });
  } catch (error) {
    res.render("error");
  }
});
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, phoneNumber, location, image } = req.body;
    let restaurant = await RESTAURANT.findOne({ name, phoneNumber });
    if (restaurant) {
      return res.send('Restaurant already exists, please update it');
    }
    restaurant = new RESTAURANT({ name, description, phoneNumber, location, image });
    await restaurant.save();
    res.redirect('/restaurants');
  } catch (error) {
    res.render('error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RESTAURANT.findById(id);
    if (data) {
      return res.render('restaurant-page', { data });
    }
    res.render('error');
  } catch (error) {
    res.render('error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RESTAURANT.findById(id);
    if (!restaurant) {
      return res.render('error');
    }
    await restaurant.delete();
    res.redirect('/restaurants');
  } catch (error) {
    res.render('error');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RESTAURANT.findById(id);
    if (!data) {
      return res.render('error');
    }
    res.render('restaurant-edit', { data });
  } catch (error) {
    res.render('error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, phoneNumber, location, image } = req.body;
    await RESTAURANT.findByIdAndUpdate(id, req.body);
    res.redirect(`/restaurants/${id}`);
  } catch (error) {
    res.render('error');

  }
});

// POST form data to Mongo DB
// router.post('/restaurants', async (req, res) => {
//   try {
//     const { name, description, phoneNumber, location, image } = req.body;
//     const restaurant = new restaurants({ name, description, phoneNumber, location, image });
//     await restaurant.save();
//     res.status(200).json(restaurant);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

//Get data from MongoDB with async await
// router.get('/restaurant/:id', async (req, res) => {
//   try {
//     const restaurantFound = await restaurants.findById(req.params.id);
//     res.status(200).json({ restaurantFound });
//     if (!restaurantFound) {
//       res.status(400).json(error);
//     }
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.put('/restaurant/:id', async (req, res) => {
//   try {
//     const updatedRestaurant = await User.findByIdAndUpdate(req.params.id, req.body,
//       { new: true });
//     res.status(200).json(updatedRestaurant);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

module.exports = router;
