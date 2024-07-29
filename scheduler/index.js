const cron = require("cron");
const updateCardOfTheDay = require("./updateCardOfTheDay");

const job = new cron.CronJob("*/10 * * * * *", async () => {
  console.log("Обновление cardOfTheDay...");
  await updateCardOfTheDay();
});

job.start();
