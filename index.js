const server = require('./server')
require('dotenv').config()
const port = process.env.PORT ? process.env.PORT : 4000;

server.listen(post, () => {
  console.log(`running on port ${port}`);
});