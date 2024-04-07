// app/services/userService.js

// const User = require('../models/user');
const client = require("../../config/db");

// Implement business logic related to users
exports.getUser = async (id) => {
    const db = await client.connect();
    // const doc = await db.collection('users').findOne({uid: req.params.id});
    const cursor = db
      .collection("users")
      .aggregate([
        { $match: { uid: id} },
        {
          $lookup: {
            from: "community",
            localField: "communities",
            foreignField: "_id",
            as: "communitiesin",
          },
        },
      ]);
    const result = [];
    for await (const doc of cursor) {
      result.push(doc);
    }
    if (result.length > 0) {
        return result[0];
    } else {
        return null;
    }
}