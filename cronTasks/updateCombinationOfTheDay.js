require("./config");
const { updateInstanceOfTheDay } = require("./updateInstanceOfTheDay");

async function updateCombinationOfTheDay() {
  const newCombination = await updateInstanceOfTheDay(
    "combinations",
    "Комбинация"
  );

  console.log(`Новая комбинация дня - ${newCombination.name}`);
}

updateCombinationOfTheDay();
