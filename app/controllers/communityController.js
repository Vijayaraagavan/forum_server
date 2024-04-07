// const User = require('../models/user');
const { ObjectId } = require("mongodb");
const client = require("../../config/db");

exports.create = async (req, res) => {
  try {
    const params = req.body;
    let payload = {
      name: params.name,
      createdAt: Date.now(),
      createdBy: params.createdBy,
    };
    // const newUser = await User.create(payload);
    const db = await client.connect();
    const found = await db
      .collection("community")
      .findOne({ name: payload.name });
    if (found) {
      res.status(400).json({ message: "community already exist" });
    } else {
      const resp = await db.collection("community").insertOne(payload);
      db.collection("users").updateOne(
        { _id: new ObjectId(payload.createdBy) },
        {
          $addToSet: { communities: payload._id },
        }
      );
      res.json(payload);
    }
    // console.log(newUser, cursor)
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
