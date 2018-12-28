// Starting point of our application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // parses incoming requests into JSON
const morgan = require('morgan'); // logging framework
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

const app = express();
const router = require('./router'); // add router

// App Setup

// Middleware - any incoming request will be passed into these middlewares
app.use(morgan('combined')); // add logging framework
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // add parsing to all requests into JSON

router(app); // include router


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on: ', port);
