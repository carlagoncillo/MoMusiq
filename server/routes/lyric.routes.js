const LyricController = require("../controllers/lyric.controllers")
console.log("Something to check..", LyricController);

module.exports = (app) => {
    app.get('/api/lyrics', LyricController.getAllLyrics);
    app.get('/api/lyrics/:id', LyricController.getOneLyric);
    app.post('/api/lyrics', LyricController.createALyric);
    app.put('/api/lyrics/:id', LyricController.updateOldLyric);
    app.delete('/api/lyrics/:id', LyricController.deleteLyric);
}

// get all
// get one
// create one
// update one
// delete one