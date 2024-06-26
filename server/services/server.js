const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors')
const session = require('express-session');
const app = express();
app.options('*', cors());
const server = http.createServer(app);

const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});


app.use('/users/signup',session({
  secret: process.env.SESSION_SECRETKEY,
  resave: true,
  store: store
}));

app.use('/users/login',session({
  secret: process.env.SESSION_SECRETKEY,
  resave: true,
  store: store
}));


const socketioOptions = {
  transports: ['websocket'],
};

const io = socketio(server, socketioOptions);

module.exports = {
  app,
  server,
  io,
};