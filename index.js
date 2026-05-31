require("dotenv").config();

const express = require("express");
const port = 8080;
const app = express();
const { Pool } = require("pg");


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.use(express.json());

const cors = require("cors");
app.use(cors());

async function initDB() {
    let retries = 5;
    while (retries) {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS urls (
                    id SERIAL PRIMARY KEY,
                    short_code VARCHAR(10) UNIQUE NOT NULL,
                    original_url TEXT NOT NULL,
                    click_count INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            `);
            console.log("DB ready");
            return;
        } catch (err) {
            retries--;
            console.log(`DB not ready, retrying... ${retries} left`);
            await new Promise(res => setTimeout(res, 2000));
        }
    }
    throw new Error("DB connection failed");
}

app.get("/urls", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM urls"
        );
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post("/urls", async (req, res) => {
    try {
        const { url } = req.body;
        const code = Math.random().toString(36).slice(2, 6);

        await pool.query(
            "INSERT INTO urls (short_code, original_url) VALUES ($1, $2)",
            [code, url]
        )
        res.status(200).json({
            message: "Successfully Added a URL",
            short_url: `http://localhost:8080/${code}`
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

});


app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
})


app.get("/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const result = await pool.query(
            "SELECT original_url FROM urls WHERE short_code = $1",
            [code]
        );


        if (result.rows.length === 0) {
            return res.status(404).json({ error: "URL not found" });
        }

        await pool.query(
            "UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1",
            [code]
        );

        res.redirect(result.rows[0].original_url);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


initDB().then(() => {
    app.listen(port, () => {
        console.log(`running on port ${port}`);
    });
});