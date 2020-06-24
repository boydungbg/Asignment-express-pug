var mongoose = require("mongoose");

// build connection string
var dbURI = "mongodb://localhost:27017/Cozastore";

// create the database and connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Connection events
//When conbection successfully
mongoose.connection.on("connectec", () => {
  console.log("Mongoose default connection open to" + dbURI);
});

//If connection faild throw an error
mongoose.connection.on("error", (error) => {
  console.log("Mongoose default connection open to" + error);
});

//When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

//If the Node process ends, close the mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = mongoose;
