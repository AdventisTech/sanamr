const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
  saveFile: async (file, destination) => {
    try {
      // No file upload logic needed if you are not handling files
      return null; // Return null or any other appropriate value
    } catch (error) {
      throw error;
    }
  },
};




