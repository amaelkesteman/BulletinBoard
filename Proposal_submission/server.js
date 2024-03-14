const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Data structures for storing client connections, subscriptions, and event articles
let connectedClients = {};
let subscriptions = {}; // { clientId: [category1, category2, ...] }
let eventArticles = []; // Array of event articles

// Middleware for logging client actions
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// RPC entry point for client-server communication: Publishing event articles
app.post('/publishEvent', (req, res) => {
    const { clientId, eventCategory, eventData } = req.body;

    // Check if the client is connected
    if (connectedClients[clientId]) {
        // Store the event article
        const newEventArticle = { id: uuidv4(), category: eventCategory, data: eventData };
        eventArticles.push(newEventArticle);

        // Respond to the client with a confirmation message
        res.json({ message: 'Event published successfully', articleId: newEventArticle.id });
    } else {
        // Respond to the client with an error if the client is not connected
        res.status(400).json({ error: 'Client not connected' });
    }
});

// RPC entry point for client-server communication: Subscribing to event categories
app.post('/subscribe', (req, res) => {
    const { clientId, categories } = req.body;

    // Check if the client is connected
    if (connectedClients[clientId]) {
        // Update the client's subscriptions
        subscriptions[clientId] = categories;

        // Respond to the client with a confirmation message
        res.json({ message: 'Subscribed successfully', categories: categories });
    } else {
        // Respond to the client with an error if the client is not connected
        res.status(400).json({ error: 'Client not connected' });
    }
});

// Endpoint for fetching all event articles
app.get('/eventArticles', (req, res) => {
    // Respond with all event articles
    res.json(eventArticles);
});

// Endpoint to handle requests for the root URL
app.get('/', (req, res) => {
    res.send('Welcome on the server!');
});

// Endpoint to handle requests for the favicon
app.get('/favicon.ico', (req, res) => {
    // Respond with a 204 status code to indicate no content
    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
