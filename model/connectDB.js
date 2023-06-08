const mongoose = require("mongoose");
function connectDatabse(url) {
  mongoose
    .connect(url)
    .then((db) => {
      console.log(`Db connection established`);
    })
    .catch((err) => {
      console.log(`Error connecting Error: ${err}`);
    });
}

module.exports = connectDatabse;
