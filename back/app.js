const express = require('express');
const mongoose = require('mongoose');
const expressListEndpoints = require('express-list-endpoints');
const userRouter = require("./routes/userRoute");
const loginRouter = require("./routes/authRoute");
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

// Define routes
app.use("/users", userRouter);
app.use("/users", loginRouter);

app.listen(port, () => {
  console.log(`Server connected on port 3000`);
});


// Routes 
console.log(expressListEndpoints(app));


module.exports = app;