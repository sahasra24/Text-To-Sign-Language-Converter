const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, {timestamps: true})

const user = mongoose.model("users", userSchema);
module.exports = user;
