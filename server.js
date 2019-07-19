const express = require('express');
const server = express();
const projectsRouter = require('./projects/projectsRouter');

server.use(logger);
server.use('/api/projects', projectsRouter);

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} from ${req.url}`
    );
    next();
  };
  

module.exports = server;