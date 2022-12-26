const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs/promises');
const { join } = require('path');

const initilization = () => {
    app.use(cors());
    app.use(express.json());

    // Upload file
    createLocalFileStore();
};

// http://localhost:5000/photo.jpg
const createLocalFileStore = async () => {
    // Create Folder
    const uploadFolder = join(__dirname, 'public');
    await fs.mkdir(uploadFolder, { recursive: true });
    // Make folder Public
    app.use(express.static(join(__dirname, 'public')));
}

app.use((err, req, res, next) => {
    (res.headersSent) && next(err);
    res.status(500)
    res.render('error', { error: err })

})

initilization();
module.exports = app;