require("dotenv").config({ path: "../.env" });

module.exports = {
  mongoURI: process.env.MONGODB_URI,
};
