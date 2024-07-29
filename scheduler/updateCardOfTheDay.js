const { MongoClient } = require("mongodb");
const { mongoURI, collectionName } = require("./config");

async function updateCardOfTheDay() {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);

    // Сброс текущего cardOfTheDay
    await collection.updateOne(
      { cardOfTheDay: true },
      { $set: { cardOfTheDay: false } }
    );

    // Получение случайной записи
    const randomCard = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomCard.length > 0) {
      // Установка cardOfTheDay на случайную запись
      await collection.updateOne(
        { _id: randomCard[0]._id },
        { $set: { cardOfTheDay: true } }
      );
    }
  } catch (err) {
    console.error("Ошибка при обновлении cardOfTheDay:", err);
  } finally {
    await client.close();
  }
}

module.exports = updateCardOfTheDay;
