const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://cozastore:BtnTw0XKxiSx4VsX@cluster0.a6htv.mongodb.net/cozastore?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log('connected succesfully to server');
  }
);

module.exports = mongoose;
