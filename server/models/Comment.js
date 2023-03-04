const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentsSchema = new Schema ({
    id: {type: Number},
    name: {type: String}

});

module.exports = mongoose.model("comments", commentsSchema);