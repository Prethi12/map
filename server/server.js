const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config();
// port 
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, '.')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})