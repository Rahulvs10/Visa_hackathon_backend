const Association = require("../models").Association;
const Driver = require("../models").Driver;
const associationController = require("../controller/").association;
const driverController = require("../controller/").driver;
const merchantController = require("../controller/").merchant;

// sessionChecker middlewares
let authMiddleware = async (req, res, next) => {
  try {
    const associationCollection = await Association.findOne({where: {email: req.body.email}});
    if (associationCollection.token === req.body.token) {
      next();
    } else {
      res.status(401).send({"message": "Invalid Credentials"})
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let driverAuthMiddleware = async (req, res, next) => {
  try {
    const driverCollection = await Driver.findOne({where: {id: req.body.id}});
    if (driverCollection.token === req.body.token) {
      next();
    } else {
      res.status(401).send({"message": "Invalid Credentials"})
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports = app => {

  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Welcome Node Sequlize API v1",
    })
  })

  app.post("/api/association/all", authMiddleware, associationController.getAllAssociations)
  app.post("/api/association/register", associationController.register)
  app.post("/api/association/login", associationController.login)
  app.post("/api/association/pay", associationController.payDrivers)
  app.put("/api/association/:userId", associationController.update)

  app.post("/api/driver/generateOtp", driverController.generateOtp)
  app.post("/api/driver/login", driverController.login)

  app.post("/api/merchant/locator", merchantController.merchantLocator)
  app.post("/api/atm/locator", merchantController.atmLocator)
  app.post("/api/merchant/pay", merchantController.merchantPushPayments)
}
