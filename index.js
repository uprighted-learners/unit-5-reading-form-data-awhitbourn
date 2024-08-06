const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize global variables
let words = {
    noun: '',
    adjective: '',
    verb: '',
    adverb: '',
    place: ''
};

// Route to display the first form
app.get('/first-word', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Madlibs Game - First Word</title>
        </head>
        <body>
            <h1>Enter a noun</h1>
            <form action="/second-word" method="POST">
                <label for="noun">Noun:</label>
                <input type="text" id="noun" name="noun" placeholder="e.g., cat" required>
                <button type="submit">Next</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle noun input
app.post('/second-word', (req, res) => {
    words.noun = req.body.noun;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Madlibs Game - Second Word</title>
        </head>
        <body>
            <h1>Enter an adjective</h1>
            <form action="/third-word" method="POST">
                <label for="adjective">Adjective:</label>
                <input type="text" id="adjective" name="adjective" placeholder="e.g., fluffy" required>
                <button type="submit">Next</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle adjective input
app.post('/third-word', (req, res) => {
    words.adjective = req.body.adjective;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Madlibs Game - Third Word</title>
        </head>
        <body>
            <h1>Enter a verb</h1>
            <form action="/fourth-word" method="POST">
                <label for="verb">Verb:</label>
                <input type="text" id="verb" name="verb" placeholder="e.g., run" required>
                <button type="submit">Next</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle verb input
app.post('/fourth-word', (req, res) => {
    words.verb = req.body.verb;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Madlibs Game - Fourth Word</title>
        </head>
        <body>
            <h1>Enter an adverb</h1>
            <form action="/fifth-word" method="POST">
                <label for="adverb">Adverb:</label>
                <input type="text" id="adverb" name="adverb" placeholder="e.g., quickly" required>
                <button type="submit">Next</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle adverb input
app.post('/fifth-word', (req, res) => {
    words.adverb = req.body.adverb;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Madlibs Game - Fifth Word</title>
        </head>
        <body>
            <h1>Enter a place</h1>
            <form action="/done" method="POST">
                <label for="place">Place:</label>
                <input type="text" id="place" name="place" placeholder="e.g., park" required>
                <button type="submit">Finish</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle the final place input and redirect to story
app.post('/done', (req, res) => {
    words.place = req.body.place;
    res.redirect('/story');
});

// Route to display the full Madlibs story
app.get('/story', (req, res) => {
    const story = `
        <h1>Your Madlibs Story</h1>
        <p>Once upon a time, a ${words.adjective} ${words.noun} decided to ${words.verb} ${words.adverb} at the ${words.place}. It was a memorable adventure!</p>
        <a href="/reset">Play Again</a>
    `;
    res.send(story);
});

// Route to reset the game
app.get('/reset', (req, res) => {
    // Reset global variables
    words = {
        noun: '',
        adjective: '',
        verb: '',
        adverb: '',
        place: ''
    };
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});












