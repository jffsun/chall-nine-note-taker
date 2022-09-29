const notes = require('express').Router();

// Import help file system functions
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

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

// DELETE '/api/notes/:id' route for deleting notes
notes.delete('/:id', (req, res) =>
 {
  console.info(`${req.method} request received`);

  // noteID variable to represent route parameter
  const noteId = req.params.id;

  // Read data from file
  readFromFile('./db/db.json')

    // Stored notes are returned as JSON string, and then parsed into a Javascript object
    .then((data) => JSON.parse(data))
    .then((json) => {

      // result variable set to new array of all notes in db.json except note whose id equals id of the note clicked. 
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;