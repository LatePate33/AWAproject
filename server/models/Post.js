const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postsSchema = new Schema ({
    id: {type: Number},
    name: {type: String}

});

module.exports = mongoose.model("posts", postsSchema);
