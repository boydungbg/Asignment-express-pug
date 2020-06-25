const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/cozastore",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected succesfully to server");
  }
);

module.exports = mongoose;
