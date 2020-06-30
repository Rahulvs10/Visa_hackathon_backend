const vdp = require("../helpers/vdp")

let merchantLocator = async (req, res) => {
  try {
    const response = await vdp.reqVisa(
      {
        payload: req.body.payload,
        path: '/merchantlocator/v1/locator'
      }
    );
    res.status(201).send(response)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let atmLocator = async (req, res) => {
  try {
    const response = await vdp.reqVisa(
      {
        payload: req.body.payload,
        path: '/globalatmlocator/v1/localatms/atmsinquiry'
      }
    );
    res.status(201).send(response)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

let merchantPushPayments = async (req, res) => {
  try {
    const response = await vdp.reqVisa(
      {
        payload: req.body.payload,
        path: '/visadirect/mvisa/v1/merchantpushpayments'
      }
    );
    res.status(201).send(response)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports = {
  merchantLocator: merchantLocator,
  atmLocator: atmLocator,
  merchantPushPayments: merchantPushPayments
}
