// copyBuild.js
const fs = require('fs-extra'); // Use fs-extra for easier file operations
const path = require('path');

// Define source and destination paths
const source = path.join(__dirname, 'frontend', 'build');
const destination = path.join(__dirname, 'backend', 'build');

// Log the paths being used
console.log(`Source: ${source}`);
console.log(`Destination: ${destination}`);

// Remove the destination if it exists
fs.remove(destination)
  .then(() => {
    // Copy the source directory to the destination
    return fs.copy(source, destination);
  })
  .then(() => {
    console.log('Build files copied successfully!');
  })
  .catch(err => {
    console.error('Error occurred while copying files:', err);
  });

