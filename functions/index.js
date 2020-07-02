const functions = require("firebase-functions");

// ------------------------ init app --------------
const app = require("express")();

//------------ Utils------------------------------

// Authorization
const { FBAuth } = require("./util/FBAuth");
const { getItems } = require("./handlers/items");

//-------------------- Routing -------------------

// get all items
app.get("/items", FBAuth, getItems);

// ---------------- EXPORT ENDPOINT --------------------
exports.api = functions.region("us-central1").https.onRequest(app);

exports.createissues;
