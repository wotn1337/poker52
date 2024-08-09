const { MongoClient } = require("mongodb");
const { mongoURI } = require("./config");

async function updateInstanceOfTheDay(collectionName, instanceName) {
  console.log(mongoURI);
  const client = new MongoClient(mongoURI);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);

    await collection.updateOne(
      { instanceOfTheDay: true },
      { $set: { instanceOfTheDay: false } }
    );

    const randomInstance = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomInstance.length > 0) {
      await collection.updateOne(
        { _id: randomInstance[0]._id },
        { $set: { instanceOfTheDay: true } }
      );
    }

    console.log(`${instanceName} дня успешно обновлена`);
    return randomInstance[0];
  } catch (err) {
    console.error(`Ошибка при обновлении "${instanceName} дня":`, err);
  } finally {
    await client.close();
  }
}

module.exports = { updateInstanceOfTheDay };
