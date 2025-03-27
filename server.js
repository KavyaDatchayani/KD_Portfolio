const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require("mongodb");


const app = express()
require('dotenv').config();

const port = process.env.PORT;

app.use(bodyParser.json());


const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DBNAME;
let db;

// Connecting to MongoDB


app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true,
}));
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Pinged your deployment. Successfully connected to MongoDB!");
        db = client.db(dbName);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}
run();

// routing api
app.post("/submit", async (req, res) => {
    const { username, email, message } = req.body;
    if (!db) return res.status(500).json({ success: false, error: "Database not connected" });

    try {
        const collection = db.collection("messages");
        await collection.insertOne({ username, email, message });
        res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
    console.log(`Running without any Problem  ${port}`)
})