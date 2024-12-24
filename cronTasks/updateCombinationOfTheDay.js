const { MongoClient } = require("mongodb");
const { Combination } = require("./combinationService/Combination");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function updateCombinationOfTheDay() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("combinations");

    await collection.updateOne(
      { instanceOfTheDay: true },
      { $set: { instanceOfTheDay: false } }
    );

    const randomInstance = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomInstance.length > 0) {
      const combinationExample = Combination.getCombinationExample(
        randomInstance[0].key
      );
      const combinationExampleObject = combinationExample.map((card) => ({
        value: card.getValue(),
        kind: card.getKind(),
        inCombination: card.getInCombination(),
      }));
      await collection.updateOne(
        { _id: randomInstance[0]._id },
        { $set: { instanceOfTheDay: true, example: combinationExampleObject } }
      );
    }

    console.log(`Комбинация дня успешно обновлена`);
    console.log(`Новая комбинация дня - ${randomInstance[0].name}`);

    return randomInstance[0];
  } catch (err) {
    console.error(`Ошибка при обновлении "Комбинация дня":`, err);
  } finally {
    await client.close();
  }
}

updateCombinationOfTheDay();
