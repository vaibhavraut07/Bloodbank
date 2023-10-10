const express = require('express');
const router = express.Router();
const BloodDonor = require('../models/Donor'); // Replace 'Donor' with 'Blood'
const City = require('../models/city'); 

// Change '/bloodbanks' to '/donors'
router.post('/', (req, res) => {
  const { Name, district, city, bloodGroup, location, contact } = req.body;
  const newBloodDonor = new BloodDonor({ Name, district, city, bloodGroup, location, contact }); // Update field names

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

    var newcities = []
    var name = []
    var contact = []
    var location = []
    var blood = []

    for (const city of cities){
      console.log( city.toJSON().city)
      newcities.push(city.toJSON().city)
    }

    for (const city of bloodDonors){
      // console.log( city.toJSON())
      name.push(city.toJSON().Name)
      // console.log( city.toJSON().Name)
      contact.push(city.toJSON().Contact)
      // console.log( city.toJSON().Contact)
      location.push(city.toJSON().Location)
      // console.log( city.toJSON().Location)
      blood.push(city.toJSON()['Blood Group'])
      // console.log( city.toJSON()['Blood Group'])
    }




    res.render('donorsPage', { bloodDonors, cities,newcities,name,contact,location,blood }); // Update the variable name to 'bloodDonors'
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blood donors');
  }
});

module.exports = router;
