const client = require('./db');

exports.run = async () => {
try {
    const db = await client.connect();
    db.createCollection('users');
} catch (error) {
    console.log(error)
}
}