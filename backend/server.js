const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Set EJS as the template engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    console.log("Received Data:", req.body);  // ✅ DEBUG - Log incoming request

    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
        console.log("Validation Failed!");  // ✅ DEBUG
        return res.status(400).json({ errors: ["All fields are required!"] });
    }

    console.log("Validation Success! Rendering Success Page."); // ✅ DEBUG
    res.render("success", { name, email, gender });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
