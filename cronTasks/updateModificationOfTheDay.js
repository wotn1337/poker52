const { updateInstanceOfTheDay } = require("./updateInstanceOfTheDay");

async function updateModificationOfTheDay() {
  const newModification = await updateInstanceOfTheDay(
    "modifications",
    "Модификация"
  );

  console.log(`Новая модификация дня - ${newModification.text}`);
}

updateModificationOfTheDay();
