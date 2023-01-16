/* eslint-disable no-param-reassign */
const express = require('express');

function routes(User){
  const userRouter = express.Router();
  // Get all users: /api/users
  userRouter.route('/users')
    // post new user
    .post ((req, res) => {
      const user = new User(req.body);
      // save user to database
      user.save();
      return res.status(201).json(user);
    })
    // get all users
    .get((req, res) => {
      User.find((err, users) => {
        if (err) {
          return res.send(err);
        }
        return res.json(users);
      })
    });

  // middleware
  userRouter.use('/users/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  // Get user by id (mongoDB id): /api/users/5f7f9b0e1b9b9c1e1c8c1c1c
  userRouter.route('/users/:userId')
    .get((req, res) => res.json(req.user))
    // update user (replace with new one)
    .put((req, res) => {
      const { user } = req;
      user.username = req.body.username;
      user.password = req.body.password;
      user.legalName = req.body.legalName;
      user.address = req.body.address;
      user.role = req.body.role;
      user.email = req.body.email;
      user.phone = req.body.phone;
      req.user.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    // update user (update only some fields)
    .patch((req, res) => {
      const { user } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      if (req.body.id) {
        delete req.body.id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        user[key] = value;
      });
      req.user.save((err) => {
        if(err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .delete((req, res) => {
      req.user.remove((err) => {
        if (err) {
          return res.send(err);
        }
        // send status 204 - removed (no content)
        return res.sendStatus(204);
      });
    });

  return userRouter;
}

module.exports = routes;