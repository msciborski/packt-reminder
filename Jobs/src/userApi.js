const axios = require('axios');

const url = process.env.URL;
const apiKey = process.env.API_KEY;


exports.getUsersWithTokens = async () => {
  const response = await axios.get(`${url}/users`);
  const { data } = response;

  return data;
}

exports.notifyUser = async (userId) => {
  await axios.post(`${url}/users/${userId}/notify`);
}