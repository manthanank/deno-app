// @deno-types="npm:@types/express"
import express from "npm:express";

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Dinosaur API!");
});

app.listen(8000);