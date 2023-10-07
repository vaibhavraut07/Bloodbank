const express = require('express');
const router = express.Router();
const BloodBank = require('../models/bloodbank');
const District = require('../models/district'); 
const City = require('../models/city'); 

router.post('/', (req, res) => {
  const { name, district, city, address, pincode, phone } = req.body;
  const newBloodBank = new BloodBank({ name, district, city, address, pincode, phone });

  newBloodBank
    .save()
    .then((bloodBank) => {
      res.redirect('/bloodbanks');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error adding blood bank');
    });
});

router.get('/op', async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    // const districts = await District.find();
    // const cities = await City.find();
    console.log(bloodBanks)

    res.render('bloodbank', { bloodBanks:bloodBanks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blood banks');
  }
});

module.exports = router;
