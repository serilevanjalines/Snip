const express = require("express");
const port = 8080;
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "snip",
    password: "postgres",
    port: 5432,
});


app.use(express.json());

const urls = new Map();

app.get("/urls", (req, res) => {
    res.json(Object.fromEntries(urls));
});


app.post("/urls", async (req, res) => {
    try {
        const { url } = req.body;
        const code = Math.random().toString(36).slice(2, 6);

        await pool.query(
            "INSERT INTO urls (short_code, original_url) VALUES ($1, $2)",
            [code, url]
        )
        res.status(200).json({ message: "Successfully Added a URL" });
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


app.listen(port, () => {
    console.log(`running on port ${port}`);
});