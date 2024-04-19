const express = require('express');
const mongoose = require('mongoose');
const expressListEndpoints = require('express-list-endpoints');
const userRouter = require("./routes/userRoute");
const loginRouter = require("./routes/authRoute");
const googleApiRouter = require("./routes/googleApiRoute");
const savedTripRouter = require("./routes/savedTripRoute");
const suggestionRouter = require("./routes/suggestionRoute");
const journeyRouter = require("./routes/journeyRoute");
const cors = require("cors");
const app = express();
const port = 3000;


// MongoDB
const mongoURI = 'mongodb+srv://admin:ewuXrOL2cQQym9Rq@cluster0.gwkwwvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error', err);
});

// Define middleware
app.use(express.json());

// Cors
app.use(cors());

// Define routes
app.use("/users", userRouter);
app.use("/users", loginRouter);
app.use(googleApiRouter);
app.use("/journey", journeyRouter);
app.use("/suggestion", suggestionRouter);
app.use("/savedTrip", savedTripRouter);



app.listen(port, () => {
  console.log(`Server connected on port 3000`);
});


// Routes 
console.log(expressListEndpoints(app));


module.exports = app;