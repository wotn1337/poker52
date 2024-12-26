const { MongoClient } = require("mongodb");
const path = require("path");
const { Card } = require("./combinationService/Card");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function updateUsersDailyBonus(collectionName, instanceName) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("users");

    const documents = await collection.find({}).toArray();

    const bulkOperations = documents.map((doc, index) => ({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { bonus: { card: Card.getRandomCard() } } },
      },
    }));

    const result = await collection.bulkWrite(bulkOperations);

    console.log(`Всем игрокам успешно установлен бонус`);
    return result;
  } catch (err) {
    console.error(`Ошибка при обновлении ежедневных бонусов:`, err);
  } finally {
    await client.close();
  }
}

updateUsersDailyBonus();
