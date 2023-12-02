/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/* eslint-disable max-len */
/* eslint-disable indent, space-before-blocks, space-before-function-paren, no-trailing-spaces */
/* eslint-disable object-curly-spacing */

const { onRequest } = require("firebase-functions/v2/https"); // Allows us to run a cloud function to listen to an endpoint
const functions = require("firebase-functions"); // Allows us to use Firebase Cloud Functions
const logger = functions.logger; // Allows us to log to the Firebase console


// Express web server framework (npm package) for Node.js
const express = require("express"); // Allows us to build an API
const cors = require("cors"); // Allows cross-origin requests
const stripeSecretKey =
  "sk_test_51OIW1rF74TkSTgumEJuFHdrouQl2xtSSsMSb3zfRkcJ7CK2123Dh4vj9ouXrx5YMVvM9ugIGeMjEc4SPMdSP5DTC00Eqm8B4KF"; // Secret key from Stripe
const stripe = require("stripe")(stripeSecretKey); // Allows us to use Stripe 

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true })); // Allows cross-origin requests
app.use(express.json()); // Allows us to send data and pass it in JSON format

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world")); // Test endpoint

app.post("/payments/create", async (request, response) => {
  const total = request.query.total; // Get the total from the request query

  logger.info(`Payment Request Recieved BOOM!!! for this amount >>> ${total}`);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = onRequest(app); // Allows us to run a cloud function to listen to an endpoint

// Example endpoint
// http://127.0.0.1:5001/challenge-ec988/us-central1/api