// app/controllers/userController.js
const { ObjectId } = require("mongodb");
const User = require("../models/user");
const client = require("../../config/db");
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { user } = req.body;
    let payload = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
    // const newUser = await User.create(payload);
    const db = await client.connect();
    const found = await db.collection('users').findOne({displayName: payload.displayName});
    if (found) {
      payload._id = found._id;
      db.collection('users').updateOne({_id: found._id}, {$set: payload}, {upsert: false})
    } else {
        const cursor = await db.collection("users").insertOne(payload);
      }
    // console.log(newUser, cursor)
    const userNew = await userService.getUser(payload.uid);

    res.json(userNew);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
// Define other user controller methods as needed

exports.getUser = async (req, res) => {
  console.log(req.params);
  try {
    const db = await client.connect();
    const cursor = db.collection("users").find({ _id: req.params.id });
    for await (const doc of cursor) {
      console.log(doc);
    }
    // console.log('user', user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: JSON.stringify(error) });
  }
};
exports.getUserByUid = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    // console.log('user', result);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: JSON.stringify(error) });
  }
};
