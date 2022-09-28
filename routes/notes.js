const notes = require('express').Router();
const notesData = require('../db/db.json');

// Import help file system functions
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// Import unique id creator
const uuid = require('../helpers/uuid');


// GET '/api/notes' route for retrieving all notes from db.json as JSON objects
notes.get('/', (req, res) => {
  console.info(`${req.method} request received`);

  // Read data from db.json
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST '/api/notes' route to save a new note to db.json
notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);

    // Destructure the request body
    const { title, text } = req.body;

    // If request body exists, then create newNote variable with unique note ID
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
      
      // Reads the file data of db.json then appends the new note to db.json's data
      readAndAppend(newNote, './db/db.json');

      res.json(`Note added successfully 🚀`);
    
    // If request body does not exist
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = notes;