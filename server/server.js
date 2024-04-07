const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();
const port = 8080;

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, "..", "server", "database", "database.sql"), (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, "..", "client")));

// Route for the index.html page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "pages", "dashboard.html"));
});

app.get("/workout-creator", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "workout_creator.html")
  );
});

app.get("/workout-searcher", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "workout_searcher.html")
  );
});

app.get("/daily-workout", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "daily_workout.html")
  );
});

app.get("/run-workout", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "run_workout.html")
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
