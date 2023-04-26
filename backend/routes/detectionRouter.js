/* eslint-disable no-param-reassign */
const express = require('express');

function routes(){
  const detectionRouter = express.Router();
  detectionRouter.route('/detection')
    // post detection
    // .post ((req, res) => {
    // return res.json({"": "G"});
    // })
    // get detection
    .get((req, res) => {
        return res.json({"detected": "G"});
      });
  return detectionRouter;
}

module.exports = routes;