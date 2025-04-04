
// const app = require('./app');
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB)
//   .then(() => {
//     // console.log('Connected to MongoDB');
//   })
//   .catch(err => {
//     // console.error('Error connecting to MongoDB:', err);
//   });

// app.listen(process.env.PORT, '0.0.0.0', () => {
//   // console.log(`Server is running on port ${process.env.PORT}`);
// });



const app = require('./app'); // Import the Express app
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB)
  .then(() => {
    // console.log('Connected to MongoDB');
  })
  .catch(err => {
    // console.error('Error connecting to MongoDB:', err);
  });

const port = process.env.PORT || 3000; // Use a default port if PORT is not specified in the environment

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
