/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Record){
  const recordRouter = express.Router();
  // Get all records: /api/ranking
  recordRouter.route('/ranking')
    // post a new record
    .post ((req, res) => {
      const record = new Record(req.body);
      // save a record to the database
      record.save();
      return res.status(201).json(record);
    })
    // get all records
    .get((req, res) => {
      Record.find((err, records) => {
        if (err) {
          return res.send(err);
        }
        return res.json(records);
      })
    });

  // middleware
  recordRouter.use('/ranking/:userId', (req, res, next) => {
    Record.findById(req.params.userId, (err, record) => {
      if (err) {
        return res.send(err);
      }
      if (record) {
        req.record = record;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  // Get order by id (mongoDB id): /api/orders/5f7f9b0e1b9b9c1e1c8c1c1c
  recordRouter.route('/ranking/:userId')
    .get((req, res) => res.json(req.record))
    // update order (replace with a new one)
    .put((req, res) => {
      const { record } = req;
      record.userId = req.body.userId;
      record.score = req.body.score;

      req.record.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(order);
      });
    })
    .delete((req, res) => {
      req.record.remove((err) => {
        if (err) {
          return res.send(err);
        }
        // send status 204 - removed (no content)
        return res.sendStatus(204);
      });
    });

  return recordRouter;
}

module.exports = routes;