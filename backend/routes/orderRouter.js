/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Order){
  const orderRouter = express.Router();
  // Get all orders: /api/orders
  orderRouter.route('/orders')
    // post new order
    .post ((req, res) => {
      const order = new Order(req.body);
      // save order to database
      order.save();
      return res.status(201).json(order);
    })
    // get all orders
    .get((req, res) => {
      Order.find((err, orders) => {
        if (err) {
          return res.send(err);
        }
        return res.json(orders);
      })
    });

  // middleware
  orderRouter.use('/orders/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId, (err, order) => {
      if (err) {
        return res.send(err);
      }
      if (order) {
        req.order = order;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  // Get order by id (mongoDB id): /api/orders/5f7f9b0e1b9b9c1e1c8c1c1c
  orderRouter.route('/orders/:orderId')
    .get((req, res) => res.json(req.order))
    // update order (replace with new one)
    .put((req, res) => {
      const { order } = req;
      order.userId = req.body.userId;
      order.date = req.body.date;
      order.dishes = req.body.dishes;
      order.total = req.body.total;
      req.order.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(order);
      });
    })
    // update order (update only some fields)
    .patch((req, res) => {
      const { order } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      if (req.body.id) {
        delete req.body.id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        order[key] = value;
      });
      req.order.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(order);
      });
    })
    .delete((req, res) => {
      req.order.remove((err) => {
        if (err) {
          return res.send(err);
        }
        // send status 204 - removed (no content)
        return res.sendStatus(204);
      });
    });

  return orderRouter;
}

module.exports = routes;