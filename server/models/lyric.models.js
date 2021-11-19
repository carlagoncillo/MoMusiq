const mongoose = require("mongoose");

const LyricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Insert song title."
        ],
        minlength: [2, "Title must be atleast 2 characters long."]
    },
    lyric: {
        type: String,
        required: [
            true,
            "Lyrics are required."
        ],
        minlength: [8, "Lyrics must be atleast 8 characters long."]
    },
    genre: {
        type: String,
        required: [
            true,
            "Pick a genre."
        ]
    },
    link: {
        type: String,
        required: [
            false
        ]
    },
    comment: {
        type: String,
        required: [
            false
        ]
    },
    idea: {
        type: String,
        required: [
            false
        ]
    }
}, {timestamps: true});

const Lyric = mongoose.model("Lyric", LyricSchema);

module.exports = Lyric;