const { mongoURI } = require("./config");
const { updateInstanceOfTheDay } = require("./updateInstanceOfTheDay");

async function updateCardOfTheDay() {
  console.debug(mongoURI);
  const newCard = await updateInstanceOfTheDay("cards", "Карта");

  console.log(`Новая карта дня - ${newCard.value} ${newCard.kind}`);
}

updateCardOfTheDay();
