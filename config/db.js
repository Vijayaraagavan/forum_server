// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'forum';

let client = null;

async function connect() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function close() {
  if (client) {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = { connect, close };
