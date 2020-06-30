let reqVisa = async (parameters) => {
  'use strict';
  let api = require('../src/vdpApi').vdpApi;
  let authCredentials = require('../config/credentials.json');

  let vdp_api = new api(authCredentials);

  try {
    let response = await vdp_api.makeRequest(parameters);
    return response.response.body;
  } catch (e) {
    console.log('Error is: ', e);
  }
}

module.exports = {
  reqVisa: reqVisa
}
