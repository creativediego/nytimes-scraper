const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({

    body: String

});

NoteSchema.plugin(mongoosePaginate);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;