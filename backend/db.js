/*db.js
 */
const mongoose = require("mongoose");

const url =
  "mongodb+srv://manush:ZVGay5tvdLuXIvQm@cluster0.cz3zih9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports.connect = () => {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.log("Error", err);
    });
};
