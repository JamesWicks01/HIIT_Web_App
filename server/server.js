const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();
const port = 8080;

// Creating and SQLite Database with relavent tables
const db = new sqlite3.Database('workouts.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, intensity TEXT, title TEXT, type TEXT, description TEXT, createdBy TEXT, visibility TEXT, duration INTEGER, exercises TEXT)");
});
app.use(express.json());

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

// API endpoint to receive workout data
app.post('/api/workouts', (req, res) => {
  const workout = req.body;
  const exercises = workout.exercises;

  // Convert exercises to JSON string
  const exercisesJson = JSON.stringify(exercises);

  // Calculate total duration
  const totalDuration = exercises.reduce((acc, exercise) => acc + exercise.duration, 0);

  // Insert into database
  db.run("INSERT INTO workouts (intensity, title, type, description, createdBy, visibility, duration, exercises) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [workout.intensity, workout.title, workout.type, workout.description, workout.createdBy, workout.visibility, totalDuration, exercisesJson], 
    function(err) {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to create workout' });
      } else {
        const workoutId = this.lastID;
        res.json({ id: workoutId });
      }
    });
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
