const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "green_nepal"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ---------------- REGISTER ----------------

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Registration Successful"
            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error while registering user"
        });

    }

});

// ---------------- LOGIN ----------------

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.json({
                success: false,
                message: "Invalid Email"
            });

        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.json({
                success: false,
                message: "Incorrect Password"
            });

        }

        res.json({

            success: true,
            message: "Login Successful",

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });

    });

});

// ---------------- PARKS ----------------

app.get("/parks", (req, res) => {

    db.query("SELECT * FROM parks", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// ---------------- WILDLIFE ----------------

app.get("/wildlife", (req, res) => {

    db.query("SELECT * FROM wildlife", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// ---------------- MOUNTAINS ----------------

app.get("/mountains", (req, res) => {

    db.query("SELECT * FROM mountains", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// ---------------- RIVERS ----------------

app.get("/rivers", (req, res) => {

    db.query("SELECT * FROM rivers", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// ---------------- CAMPAIGNS ----------------

app.get("/campaigns", (req, res) => {

    db.query("SELECT * FROM campaigns", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// ---------------- CONTACT ----------------

app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    const sql = "INSERT INTO contact(name,email,message) VALUES(?,?,?)";

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Message Sent Successfully"
        });

    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
});