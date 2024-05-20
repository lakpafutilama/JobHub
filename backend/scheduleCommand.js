const schedule = require("node-schedule");
const { expireJob } = require("./services/jobService");

schedule.scheduleJob("0 0 * * *", () => {
  const date = new Date();
  expireJob(date);
});
