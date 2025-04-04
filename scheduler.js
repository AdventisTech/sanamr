// const cron = require('node-cron');
// const axios = require('axios'); // Import axios for making HTTP requests
// const sendEmail = require('./models/emailService');

// // Function to fetch emails from the API endpoint
// const fetchEmailsFromAPI = async () => {
//   try {
//     // const response = await axios.get('https://cstimesheet-unsk.onrender.com');
//     const response = await axios.get('https://proutimesheet.onrender.com/api/user/5498');
//     // Check if the response contains user data
//     // Check if the response contains user data
//     if (response.data && Array.isArray(response.data)) {
//       // Filter out users with EmployeeStatus as "Current" and map to their email addresses
//       return response.data
//         .filter(user => user.EmployeeStatus === "Current")
//         .map(user => user.Emailaddress);
//     } else {
//       return [];
//     }
//   } catch (error) {

//     return []; // Return an empty array if there's an error
//   }
// };

// // Function to send Friday evening email
// const sendmondayMorningEmail = async () => {
//   try {
//     const formData = {
//       // Your form data here
//     };
//     const recipients = await fetchEmailsFromAPI(formData);
//     if (recipients.length > 0) {
//       const subject = 'Reminder: Please Fill Out Your Timesheet for Last Week!';
//       // const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://proutimesheet.onrender.com';
//       const text = 'Dear Team, This is a friendly reminder to fill out and submit your timesheet for the previous week by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://proutimesheet.onrender.com';
//       sendEmail(recipients, subject, text);
//     } else {

//     }
//   } catch (error) {

//   }
// };
// // Function to send Friday evening email
// const sendFridayEveningEmail = async () => {
//   try {
//     const formData = {
//       // Your form data here
//     };
//     const recipients = await fetchEmailsFromAPI(formData);
//     if (recipients.length > 0) {
//       const subject = 'Reminder: Please Fill Out Your Timesheet for This Week!';
//       const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://proutimesheet.onrender.com';
//       sendEmail(recipients, subject, text);
//     } else {

//     }
//   } catch (error) {

//   }
// };

// // cron.schedule('20 27 17 * * 5', sendmondayMorningEmail);
// cron.schedule('0 10 * * 1', sendmondayMorningEmail);
// cron.schedule('0 17 * * 5', sendFridayEveningEmail);










const cron = require('node-cron');
const axios = require('axios'); // Import axios for making HTTP requests
const sendEmail = require('./models/emailService');

// Function to fetch emails from the API endpoint
const fetchEmailsFromAPI = async () => {
  try {
    // const response = await axios.get('https://proutimesheet.onrender.com/api/user/5498');
    const response = await axios.get('https://sanmarctdetimesheet.onrender.com/api/user/5498');
    if (response.data && Array.isArray(response.data)) {
      return response.data
        .filter(user => user.EmployeeStatus === "Current")
        .map(user => user.Emailaddress);
    } else {
      return [];
    }
  } catch (error) {
    return []; // Return an empty array if there's an error
  }
};

// Function to send Friday evening email
const sendFridayEveningEmail = async () => {
  try {
    const recipients = await fetchEmailsFromAPI();
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for This Week!';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://sanmarctdetimesheet.onrender.com';
      sendEmail(recipients, subject, text);
    }
  } catch (error) {
    console.error('Failed to send Friday evening email:', error);
  }
};

// Function to send Monday morning email
const sendmondayMorningEmail = async () => {
  try {
    const recipients = await fetchEmailsFromAPI();
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for Last Week!';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your timesheet for the previous week by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://sanmarctdetimesheet.onrender.com';
      sendEmail(recipients, subject, text);
    }
  } catch (error) {
    console.error('Failed to send Monday morning email:', error);
  }
};

// Set the timezone to Indian Standard Time
process.env.TZ = 'Asia/Kolkata';

// Schedule the cron jobs
cron.schedule('0 17 * * 5', sendFridayEveningEmail); // 5:00 PM IST on Friday
cron.schedule('0 10 * * 1', sendmondayMorningEmail); // 10:00 AM IST on Monday
