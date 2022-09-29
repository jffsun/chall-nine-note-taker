const express = require('express');

// Import modular routers for /notes
const notesRouter = require('./notes');

const app = express();

// Mounts path to notesRouter at '/notes'
app.use('/notes', notesRouter);

module.exports = app;