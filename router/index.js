const Association = require("../models").Association;
const associationController = require("../controller/").association;

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

module.exports = app => {

  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Welcome Node Sequlize API v1",
    })
  })

  app.post("/api/association/all", authMiddleware, associationController.getAllAssociations)

  app.post("/api/association/register", associationController.register)

  app.post("/api/association/login", associationController.login)

  app.put("/api/association/:userId", associationController.update)

}
