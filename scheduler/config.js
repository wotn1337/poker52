require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  collectionName: process.env.MONGODB_CARDS_COLLECTION_NAME,
};
