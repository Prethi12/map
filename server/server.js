const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const Signin = require("./schema/schems");
const Marker = require("./schema/Marker");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

connectDB();

const port = process.env.PORT;
app.use(express.static(path.join(__dirname, '.')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


//register route

app.post("/register", async (req, res) => {
    console.log("Request body:", req.body);
    const { Email, Phone, password, Lat, Lang } = req.body;

    if (!Email || !Phone || !password || !Lat || !Lang) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const location = { Lat, Lang };

    res.setHeader("Content-Type", "application/json");

    try {
        const newUser = new Signin({
            Email,
            Phone,
            password,
            Location: location
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" ,usr: newUser});
    } catch (err) {
        console.log("Error saving user:", err);
        res.status(500).json({ error: err.message });
    }
});


//marker route

app.post("/markers", async (req, res) => {
    const { userMail, Lat, Lang } = req.body;
    if (!userMail || !Lat || !Lang) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newMarker = new Marker({
            userMail,
            Lat,
            Lang,
        });

        await newMarker.save();
        res.status(201).json({ message: "Marker added successfully", marker: newMarker });
    } catch (err) {
        console.error("Error saving marker:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
