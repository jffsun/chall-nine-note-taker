const notes = require('express').Router();
const notesData = require('../db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes from db.json as JSON objects
notes.get('/', (req, res) => {
    console.info(`${req.method} request received`);
    res.json(notesData);
});

// POST Route to save a new note to db.json
notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    console.log(req.body);

    // Destructure the request body
    const { title, text } = req.body;

    // If request body exists, then create newNote variable with unique note ID
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
      
      // QUESTION: Why is this the path? Relative to root directory? Or relative to routes.js location
      // Reads the file data of db.json then appends the new note to db.json's data
      readAndAppend(newNote, './db/db.json');

      res.json(`Note added successfully 🚀`);
      console.log(notesData);
    
    // If th
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = notes;