const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (for frontend)
app.use(express.static(path.join(__dirname, "public")));

// PostgreSQL Connection Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydatabase",
    password: "20150",
    port: 5432
});

// Check database connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL database"))
    .catch(err => console.error("❌ Database connection error:", err.message));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ API to Fetch Curriculum Table Data
app.get("/get-curriculum", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, subject_name, program_id, room_id, schoolyear_id FROM tbl_curriculum
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error fetching data:", err.message);
        res.status(500).json({ message: "Error fetching data" });
    }
});

// ✅ API to handle form submission
app.post("/add-curriculum", async (req, res) => {
    try {
        const { program_id, subject_name, room_id, schoolyear_id } = req.body;

        // Check if all fields are provided
        if (!program_id || !subject_name || !room_id || !schoolyear_id) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Insert data into tbl_curriculum
        const result = await pool.query(
            "INSERT INTO tbl_curriculum (program_id, subject_name, room_id, schoolyear_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [program_id, subject_name, room_id, schoolyear_id]
        );

        res.json({ message: "✅ Curriculum added successfully!", data: result.rows[0] });
    } catch (error) {
        console.error("❌ Error inserting data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at: http://localhost:${port}`);
});
