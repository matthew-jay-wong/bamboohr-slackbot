
const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const slackDailyUpdates = require('./src/scheduledJobs/slackDailyUpdate');

const schedule = require('node-schedule');

const { PORT } = require('./src/config');
const environment = require('./src/config');

Object.entries(environment).forEach(([key, value]) => {
  if (value === '') {
    console.log(`Required environment variable "${key}" was undefined!\n`.repeat(10));
    process.exit(1);
  }
});

const server = app.listen(PORT, () => {
  console.log(
    'Express web server is running on port %d in %s mode',
    server.address().port,
    app.settings.env
  );

  schedule.scheduleJob('0 9 * * *', slackDailyUpdates);
});
