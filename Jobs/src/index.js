const scrapper = require('./scrapper');
const dotenv = require('dotenv').config();
const userApi = require('./userApi');

const notifyUsers = async () => {
  const bookInfo = await scrapper.getBookInformation();
  const users = await userApi.getUsersWithTokens();
}


(async () => {
  try {
    const users = await userApi.getUsersWithTokens();
    console.log(users);
  } catch (error) {
    console.log(error);
  }

})();