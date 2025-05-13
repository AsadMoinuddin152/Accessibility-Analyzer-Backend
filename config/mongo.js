const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectToMongoDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });

    console.log("✅ Connected to CosmosDB MongoDB successfully!");
    return client;
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
  }
};

module.exports = { connectToMongoDb };
