/* ----------------------------------------------------------------------------------------------------------------------
* © Copyright 2018 Visa. All Rights Reserved.
*
* NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of
* and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property
* rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.
*
* By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy
* (developer.visa.com/privacy). In addition, all permissible uses of the Software must be in support of Visa products,
* programs and services provided through the Visa Developer Program (VDP) platform only (developer.visa.com).
* THE SOFTWARE AND ANY ASSOCIATED INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL
* FAULTS” BASIS WITHOUT WARRANTY OR CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.
---------------------------------------------------------------------------------------------------------------------- */

/*jshint -W069 */
/**
 *
 * @class vdpApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
const vdpApi = (function () {
  'use strict';

  const request = require('request');
  const Q = require('q');
  const randomString = require('randomstring');
  const expect = require('chai').expect;
  const req = request.defaults();
  const fs = require('fs');

  function req_vdp_api(options) {

    if (typeof options !== 'object') {
      throw new Error('"authCredientials" object is missing. Constructor should be called with a json object');
    }

    let domain = (typeof options === 'object') ? options.domain : options;
    this.domain = domain ? domain : 'https://sandbox.api.visa.com';
    if (this.domain.length === 0) {
      throw new Error('Domain parameter must be specified as a string.');
    }

    let missingValues = [];

    if (options.userId) {
      this.userId = options.userId;
    } else {
      missingValues.push('userId');
    }

    if (options.userId) {
      this.password = options.password;
    } else {
      missingValues.push('password');
    }

    if (options.key) {
      this.keyFile = options.key;
    } else {
      missingValues.push('key');
    }

    if (options.cert) {
      this.certificateFile = options.cert;
    } else {
      missingValues.push('cert');
    }

    if (options.ca) {
      this.caFile = options.ca;
    } else {
      missingValues.push('ca');
    }

    if (missingValues.length > 0) {
      let errorString = missingValues.join(", ");
      if (missingValues.length === 1) {
        throw new Error(errorString + " is missing in authCredientials.");
      } else {
        throw new Error(errorString + " are missing in authCredientials.");
      }
    }
  }

  /**
   * Merchant Search
   * @method
   * @name req_vdp_api#makeRequest
   *
   * @param parameters
   */
  req_vdp_api.prototype.makeRequest = function (parameters) {
    if (parameters === undefined) {
      parameters = {};
    }
    let deferred = Q.defer();

    let domain = this.domain;
    let path = parameters.path;

    let body;
    let queryParameters = {};
    let headers = {};
    let form = {};
    if (parameters && parameters.payload) {
      body = parameters.payload;
    }

    headers['User-Agent'] = 'VDP_SampleCode_Nodejs';
    headers['Authorization'] = 'Basic ' + new Buffer(this.userId + ':' + this.password).toString('base64');
    headers['x-correlation-id'] = randomString.generate({
      length: 12,
      charset: 'alphanumeric'
    }) + '_SC';

    if (parameters['x-client-transaction-id'] !== undefined) {
      headers['x-client-transaction-id'] = parameters['x-client-transaction-id'];
    }

    let req = {
      method: 'POST',
      uri: domain + path,
      qs: queryParameters,
      key: fs.readFileSync(this.keyFile),
      cert: fs.readFileSync(this.certificateFile),
      ca: fs.readFileSync(this.caFile),
      headers: headers,
      body: body
    };

    if (Object.keys(form).length > 0) {
      req.form = form;
    }
    if (typeof (body) === 'object' && !(body instanceof Buffer)) {
      req.json = true;
    }
    request(req, function (error, response, body) {
      if (error) {
        console.log("error " + JSON.stringify(error));
        deferred.reject(error);
      } else {
        if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
          try {
            body = JSON.parse(body);
          } catch (e) {

          }
        }
        if (response.statusCode === 204) {
          deferred.resolve({
            response: response
          });
        } else if (response.statusCode >= 200 && response.statusCode <= 299) {
          deferred.resolve({
            response: response,
            body: body
          });
        } else {
          deferred.reject({
            response: response,
            body: body
          });
        }
      }
    });

    return deferred.promise;
  };

  return req_vdp_api;
})();

exports.vdpApi = vdpApi;
