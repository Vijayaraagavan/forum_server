// const User = require('../models/user');
const { ObjectId } = require("mongodb");
const client = require("../../config/db");

const create = async (req, res) => {
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

const createPost = async (req, res) => {
  if (validatePost(req.body)) {
    try {
      const params = req.body;
      let payload = {
        title: params.title,
        body: params.body,
        createdAt: Date.now(),
        createdBy: params.userId,
        communityId: params.community,
        upVote: [],
        downVote: [],
        comments: 0,
        threads: [],
      };
      const db = await client.connect();
      const resp = await db.collection("posts").insertOne(payload);
      res.json(resp);
    } catch (error) {
      res.status(400).json({ message: "Unknown error" });
    }
  } else {
    res.status(400).json({ message: "Invalid form" });
  }
};

const getPosts = async (req, res) => {
  const pages = 10;
  const community = req.body.community;
  try {
    const db = await client.connect();
    const cursor = await db
      .collection("posts")
      .find({ communityId: community });
    const posts = [];
    for await (const doc of cursor) {
      posts.push(doc);
    }
    res.json({ posts: posts });
  } catch (error) {}
};

const vote = async (req, res) => {
  const db = await client.connect();
  const { post, vote, userId } = req.body;
  const key = vote > 0 ? "upVote" : "downVote";
  const remove = vote > 0 ? "downVote" : "upVote";
  try {
    await db
      .collection("posts")
      .updateOne(
        { _id: new ObjectId(post._id) },
        { $addToSet: { [key]: userId }, $pull: { [remove]: userId } }
      );
      const resp = await db.collection('posts').findOne({_id: new ObjectId(post._id)})
    res.json({ message: "updated", post: resp });
  } catch (error) {
    console.log(error);
  }
};

const getRecent = async (req, res) => {
  const db = await client.connect();
  try {
    const cursor = await db
      .collection("community")
      .find();
    const communities = [];
    for await (const doc of cursor) {
      communities.push(doc);
    }
    res.json({ communities: communities });
  } catch (error) {
    console.log(error);
  }
}

const join = async (req, res) => {
  const db = await client.connect();
  const { communityId, userId } = req.body;
  try {
    await db
      .collection("community")
      .updateOne(
        { _id: new ObjectId(communityId) },
        { $addToSet: { members: userId }}
      );
      const resp = await db.collection('community').findOne({_id: new ObjectId(communityId)})
    res.json({ message: "updated", community: resp });
  } catch (error) {
    console.log(error);
  }
}

const leave = async (req, res) => {
  const db = await client.connect();
  const { communityId, userId } = req.body;
  try {
    await db
      .collection("community")
      .updateOne(
        { _id: new ObjectId(communityId) },
        { $pull: { members: userId }}
      );
      const resp = await db.collection('community').findOne({_id: new ObjectId(communityId)})
    res.json({ message: "updated", community: resp });
  } catch (error) {
    console.log(error);
  }
}

const communityPage = async (req, res) => {
  console.log(req.body.community)
  try {
    const db = await client.connect();
    const com = await db.collection('community').findOne({name: req.body.community});
    if (!com) {
      res.status(400).json({message: "No community found"})
      return;
    }
    const cursor = db
        .collection("posts")
        .find({ communityId: com._id.toString() });
      const posts = [];
      for await (const doc of cursor) {
        posts.push(doc);
      }
    res.json({
      community: com,
      posts: posts
    })
  } catch (error) {
    handleError(error, res);
  }

}

const validatePost = (data) => {
  if (!data.title || !data.body) {
    return false;
  }
  return true;
};

const handleError = (err, res) => {
  res.status(400).json({message: err})
}

module.exports = {
  createPost,
  create,
  getPosts,
  vote,
  getRecent,
  join,
  leave,
  communityPage
};
