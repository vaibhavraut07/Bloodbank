const express = require('express');
const router = express.Router();
const BloodBank = require('../models/bloodbank');
const City = require('../models/city');

// Update the existing GET route to render the blood bank page
router.get('/op', async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    const citys = await City.find();

    var cities = []

    for (const city of citys){
      console.log( city.toJSON().city)
      cities.push(city.toJSON().city)
    }
    // console.log(cities)

    res.render('bloodbank', { bloodBanks, cities });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blood banks');
  }
});

// Update the existing POST route to handle the submission of the district and city filters
router.get('/filter', async (req, res) => {
  const district = req.query.district;
  const city = req.query.city;

  try {
    let bloodBanks;

    if (district === 'Select District' && city === 'Select City') {
      bloodBanks = await BloodBank.find();
    } else if (district === 'Select District') {
      bloodBanks = await BloodBank.find({ city });
    } else if (city === 'Select City') {
      bloodBanks = await BloodBank.find({ district });
    } else {
      bloodBanks = await BloodBank.find({ district, city });
    }

    const cities = await City.find();

    

    res.render('bloodbank', { bloodBanks, cities });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error filtering blood banks');
  }
});

// Keep your existing POST route for adding new blood banks
router.post('/', (req, res) => {
  const { name, district, city, address, pincode, phone } = req.body;
  const newBloodBank = new BloodBank({ name, district, city, address, pincode, phone });

  newBloodBank
    .save()
    .then((bloodBank) => {
      res.redirect('/bloodbanks/op');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error adding blood bank');
    });
});

// Add a new route to retrieve more details for a specific blood bank based on its ID
router.get('/details/:id', async (req, res) => {
  try {
    const bloodBankId = req.params.id;
    const bloodBank = await BloodBank.findById(bloodBankId);

    if (!bloodBank) {
      return res.status(404).send('Blood bank not found');
    }

    res.json(bloodBank);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blood bank details');
  }
});

module.exports = router;
