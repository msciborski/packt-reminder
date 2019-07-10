const scrapper = require('./scrapper');
const dotenv = require('dotenv').config();
const userApi = require('./userApi');
const schedule = require('node-schedule');

const url = 'https://www.packtpub.com/free-learning';

const notifyUsers = async () => {
  const bookInfo = await scrapper.getBookInformation();
  const users = await userApi.getUsersWithTokens();
}

const rule = schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 6;
rule.minute = 0;

var job = schedule.scheduleJob(rule, async () => {
  const bookInfo = await scrapper.getBookInformation(url);
});


// (async () => {
//   try {
//     const users = await userApi.getUsersWithTokens();
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }

// })();