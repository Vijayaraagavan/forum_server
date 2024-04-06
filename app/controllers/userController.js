// app/controllers/userController.js
const {ObjectId} = require('mongodb')
const User = require('../models/user');
const client = require('../../config/db');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Define other user controller methods as needed

exports.getUser = async (req, res) => {
  console.log(req.params);
  try {
    const db = await client.connect();
    const cursor = db.collection('users').find({_id: req.params.id});
    for await (const doc of cursor) {
      console.log(doc);
    }
    // console.log('user', user);
  } catch (error) {
    console.log(error)
    res.status(400).json({message: JSON.stringify(error)})
  }
}
