const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    Lat: { type: Number, required: true },
    Lang: { type: Number, required: true }
});

const signinSchema = new mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true },
    password: { type: String, required: true },
    Location: { type: locationSchema, required: true }
});

const Signin = mongoose.model("Signin", signinSchema);
module.exports = Signin;
