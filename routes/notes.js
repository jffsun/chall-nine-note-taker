const notes = require('express').Router();
const notesData = require('../db/notes.json');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all notes from notes.json 
notes.get('/', (req, res) => {
    console.info(`${req.method} request received`);

    // TO DO: notes to notes.html page
    readFromFile('../db/notes.json').then((data) => res.json(JSON.parse(data)));
    // res.json(notesData);
});

// POST note for new save in notes.kson
notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, '../db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
module.exports = notes;