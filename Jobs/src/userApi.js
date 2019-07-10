const axios = require('axios');

const url = process.env.URL;
const port = process.env.PORT;
const apiKey = process.env.API_KEY;


exports.getUsersWithTokens = async () => {
  const response = await axios.get('/users', { proxy: { host: url, port: parseInt(port) } } );
  const { data } = response;

  return data;
}

exports.notifyUser = async (userId) => {
  await axios.post(`${url}/users/${userId}/notify`);
}