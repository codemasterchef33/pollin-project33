// importing express package
const express = require("express");

// importing db for setting up database
const  sequelize  = require("./config/database");

// initializing express
const app = express();

// importing bodyParser
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

// using bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// adding middleware for setting up our routes
const routes = require("./routes/app");
app.use(routes);

const Question = require("./models/poll");
const Option = require("./models/options");

// Define the association
Question.hasMany(Option, { foreignKey: "questionId" });
Option.belongsTo(Question, { foreignKey: "questionId" });

sequelize
  .sync({ force: true }) // Set force to true to drop existing tables and recreate them
  .then(() => {
    // Start the server and listen on port 8000
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in connecting to the server", err);
        return;
      }
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error("Error synchronizing Sequelize models:", err);
  });
