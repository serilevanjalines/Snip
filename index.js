const express = require("express");
const port = 8080;
const app = express();

//because request is not visible inn node.js , we need expreess
app.use(express.json());

const urls = new Map();

//return the urls
app.get("/urls", (req, res) => {
    //since map cannot be deserialize to json , so as objects
    res.json(Object.fromEntries(urls));
});

app.post("/urls", (req, res) => {

    const q = req.body.url;
    const code = Math.random().toString(36).slice(2, 6);
    urls.set(code, q);
    res.status(200).json({ message: "Successfully Added a URL" });

});

app.get("/:code", (req, res) => {

    const q = req.params.code;
    if (urls.get(q) !== undefined) {
        res.json(urls.get(q));
    }
    else {
        res.status(400).json("There is no URL ");
    }

});


app.listen(port, () => {
    console.log(`running on port ${port}`);
});