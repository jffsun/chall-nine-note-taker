const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Custom helper function taking file path and content to be written
const writeToFile = (destination, content) =>

  // Stringify content and writes to destination
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>

    // If error is truthy, console log error, and if error falsy then confirm data is written
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Custom helper function that reads given file and appends given content 
const readAndAppend = (content, file) => {

  // Reads file, if error then console log error
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {

      // If file is read, then parse the file's data
      const parsedData = JSON.parse(data);

      // Push the appending content to the file's data
      parsedData.push(content);

      // Write combined data to file
      writeToFile(file, parsedData);
    }
  }); 
};

module.exports = { readFromFile, writeToFile, readAndAppend };