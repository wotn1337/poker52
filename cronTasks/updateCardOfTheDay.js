require("./config");
const { updateInstanceOfTheDay } = require("./updateInstanceOfTheDay");

async function updateCardOfTheDay() {
  const newCard = await updateInstanceOfTheDay("cards", "Карта");

  console.log(`Новая карта дня - ${newCard.value} ${newCard.kind}`);
}

updateCardOfTheDay();
