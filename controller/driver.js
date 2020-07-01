const Driver = require("../models").Driver;
const Association = require("../models").Association;
const utils = require("../helpers/utils")
const validator = require('validator');
const vdp = require("../helpers/vdp")

let generateOtp = async (req, res) => {
  try {
    let driverCollection = await Driver.findOne({where: {cardno: req.body.cardno}})
    driverCollection.otp = Math.floor((Math.random() * 8999) + 1000);
    driverCollection.save();
    res.status(201).send({"message": "OTP generated"});
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let login = async (req, res) => {
  try {
    let driverCollection = await Driver.findOne({where: {cardno: req.body.cardno}})
    if (driverCollection.otp === req.body.otp) {
      const date = new Date();
      const timestamp = date.getTime();
      driverCollection.token = utils.encryptString(req.body.otp.toString(), timestamp.toString());
      driverCollection.otp = 0;
      driverCollection.save();
      res.status(201).send(driverCollection)
    } else {
      res.status(401).send({"message": "Invalid Credentials"})
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let update = async (req, res) => {
  try {
    const associationCollection = await Association.find({
      id: req.params.AssociationId,
    })
    if (associationCollection) {
      const updatedAssociation = await Association.update(req.body)
      res.status(201).send(updatedAssociation)
    } else {
      res.status(404).send("Association Not Found")
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

module.exports = {
  update: update,
  login: login,
  generateOtp: generateOtp
}
