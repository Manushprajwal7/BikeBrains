const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");
const router = require("./inedx"); // Ensure this path is correct
const PORT = process.env.PORT || 8080;

// Database connection
db.connect();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// API routes
app.use("/api", router);

// Static resources
app.use("/upload", express.static(path.join(__dirname, "/../uploads")));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../frontend/build")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "/../frontend/build/index.html");

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res
      .status(404)
      .send("Frontend build not found. Make sure to build the React app.");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
