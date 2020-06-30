const Association = require("../models").Association;
const utils = require("../helpers/utils")
const validator = require('validator');
const vdp = require("../helpers/vdp")

const registerHelper = async (req) => {
  if (!req.body.email || !validator.isEmail(req.body.email)) {
    return new utils.CustomError("Not a valid email");
  }
  req.body.email = req.body.email.toLowerCase();
  if (!req.body.password || req.body.password.length < 6) {
    return new utils.CustomError("Password should be at least 6 characters excluding leading or trailing whitespaces");
  }
  if (!req.body.name || req.body.name.length === 0) {
    return new utils.CustomError("Username should not be empty");
  }
  if (!validator.isMobilePhone(req.body.phno.toString())) {
    return new utils.CustomError("Enter a valid 10 digit mobile number");
  }

  try {
    req.body.password = utils.encryptString(req.body.password);

    let association = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phno: req.body.phno,
      token: null
    }
    let newAssociation = new Association(association);
    await newAssociation.save();
    return newAssociation;
  } catch (err) {
    if (!(err instanceof utils.CustomError)) {
      console.log(err);
      return new utils.CustomError("Internal Server Error");
    } else {
      return new utils.CustomError(err.message);
    }
  }
}

let getAllAssociations = async (req, res) => {
  try {
    const associationCollection = await Association.findAll({})
    res.status(201).send(associationCollection)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

let register = async (req, res) => {
  try {
    const associationCollection = await registerHelper(req)
    res.status(201).send(associationCollection)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let login = async (req, res) => {
  try {
    let associationCollection = await Association.findOne({where: {email: req.body.email}})
    if (associationCollection.password === utils.encryptString(req.body.password)) {
      const date = new Date();
      const timestamp = date.getTime();
      associationCollection.token = utils.encryptString(req.body.email, timestamp.toString());
      associationCollection.save();
      res.status(201).send(associationCollection)
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

let payDrivers = async (req, res) => {
  try {
     const response = await vdp.reqVisa(
      {
        payload: req.body.payload,
        path: '/visadirect/fundstransfer/v1/multipushfundstransactions'
      }
    );
    res.status(201).send(response)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

module.exports = {
  getAllAssociations: getAllAssociations,
  register: register,
  update: update,
  login: login,
  payDrivers: payDrivers
}
