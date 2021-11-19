// CRUD

const Lyric = require("../models/lyric.models");

module.exports = {

    getAllLyrics: (req, res) => {
        Lyric.find()
            .then(allDaLyrics => res.json({ lyrics: allDaLyrics }))
            .catch(err => res.json ({ message: "Something went Wrong", error: err}))
        },
        // READ
        getOneLyric: (req, res) => {
            Lyric.findOne({ _id: req.params.id})
                .then(oneLyric => res.json({ lyric: oneLyric }))
                .catch(err => res.json ({ message: "Something went Wrong", error: err}))
            },
            // CREATE or POST
            createALyric: (req, res) => {
                Lyric.create(req.body)
                .then(newLyric => res.json({ lyric: newLyric}))
                .catch(err => res.status(400).json ({ message: "Something went Wrong", error: err}))
            },
            // UPDATE or PUT
            updateOldLyric: (req, res) => {
                Lyric.findByIdAndUpdate(
                    {_id: req.params.id}, 
                    req.body,
                    {new: true, runValidators: true}
                    )
                    .then(updateLyric=> res.json({ lyric: updateLyric }))
                    .catch(err => res.status(400).json ({ message: "Something went Wrong", error: err}))
            },
            // DELETE
                deleteLyric: (req, res) =>{
                    Lyric.deleteOne({ _id: req.params.id })
                    .then(result => res.json({ result: result }))
                    .catch(err => res.json ({ message: "Something went Wrong", error: err}))
            }

}
