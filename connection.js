const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url,{
  serverSelectionTimeoutMS: 30000 // Increase the timeout
});
}

module.exports = {
  connectToMongoDB,
};
