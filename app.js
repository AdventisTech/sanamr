// const express = require('express');
// const app = express();
// const parser = require('body-parser');
// const path = require('path');
// const cors = require('cors');
// const multer = require('multer');
// const upload = multer();

// const userRoute = require('./route/Registration');
// const projectRoute = require('./route/projects');
// const UserprojectRoute = require('./route/Userprojects');
// const Usercontacts = require('./route/contacts');
// const opportunity = require('./route/opportunity');

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(parser.json());
// app.use(express.json());
// app.use(cors());
// app.use(upload.any());

// app.use((req,res,next)=>{
//     console.log("app.js file",__dirname);
//     next();
// })
// app.use('',express.static(path.join(__dirname,'time-sheet')));

// app.use('/api/user',userRoute);
// app.use('/api/user',projectRoute);
// app.use('/api/user',UserprojectRoute);
// app.use('/api/user',Usercontacts);
// app.use('/api/user',opportunity);
// module.exports = app;


const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config();

const userRoute = require('./route/Registration');
const projectRoute = require('./route/projects');
const UserprojectRoute = require('./route/Userprojects');
const Usercontacts = require('./route/contacts');
const opportunity = require('./route/opportunity');
const projectRoute1 = require('./route/projects1');
const TaskRoute = require('./route/billable');
require('./scheduler');
// const billableController = require('../controller/billable');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(parser.json());
app.use(express.json());
app.use(cors());
app.use(upload.any());

app.use((req, res, next) => {
  // console.log("app.js file", __dirname);
  next();
});

// app.use('', express.static(path.join(__dirname, 'time-sheet')));
app.use('', express.static(path.join(__dirname, 'prou')));


app.use('/api/user', userRoute);
app.use('/api/user', projectRoute);
app.use('/api/user', UserprojectRoute);
app.use('/api/user', Usercontacts);
app.use('/api/user', opportunity);
app.use('/api/user', projectRoute1);
app.use('/api/user', TaskRoute);


// WebSocket connection event
wss.on('connection', (socket) => {
  console.log('A user connected');

  // Fetch data from MongoDB and send it to the connected client
  fetchDataAndSend(socket);

  // Handle WebSocket messages (if needed)
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

async function fetchDataAndSend(socket) {
  try {
    const result = await assetModel.find();
    // Send data to the connected client
    socket.send(JSON.stringify(result));
  } catch (error) {
    // console.error('Error fetching data:', error.message);
  }
}

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  // console.log('Server and scheduler started.');
module.exports = app; // Export the Express app
