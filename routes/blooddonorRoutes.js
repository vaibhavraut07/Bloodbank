const express = require('express');
const router = express.Router();
const BloodDonor = require('../models/Donor'); // Replace 'Donor' with 'Blood'
const City = require('../models/city'); 

// Change '/bloodbanks' to '/donors'
router.post('/', (req, res) => {
  const { name, district, city, bloodGroup, location, contact } = req.body;
  const newBloodDonor = new BloodDonor({ name, district, city, bloodGroup, location, contact }); // Update field names

  newBloodDonor
    .save()
    .then((donor) => {
      res.redirect('/donors'); // Change the redirection URL
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error adding blood donor');
    });
});

router.get('/check', async (req, res) => {
  try {
    const bloodDonors = await BloodDonor.find(); // Update the data fetching

    const cities = await City.find()


    res.render('donorsPage', { bloodDonors, cities }); // Update the variable name to 'bloodDonors'
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blood donors');
  }
});

module.exports = router;
