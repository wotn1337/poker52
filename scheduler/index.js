const cron = require("cron");
const updateCardOfTheDay = require("./updateCardOfTheDay");

// Настройка задания на запуск каждый день в 00:00
const job = new cron.CronJob("0 0 * * *", async () => {
  console.log("Обновление cardOfTheDay в 00:00...");
  await updateCardOfTheDay();
});

job.start();
