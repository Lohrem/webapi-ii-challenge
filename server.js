const express = require('express');
const server = express();
const postsRouter = require('./data/seeds/postsRouter')

server.use(express.json());
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
  res.send('yello hello');
});

module.exports = server