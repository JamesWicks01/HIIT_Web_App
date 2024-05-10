//Defining the dependancies 
const express = require("express");
const path = require("path");
const app = express();

//Defining the port of the web app
const port = 8080;

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, "..", "client")));

//SERVER GET REQUESTS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "pages", "index.html"));
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
app.get("/your-workouts", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "your_workouts.html")
  );
});
app.get("/run-workout", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "client", "pages", "run_workout.html")
  );
});

//How the server connects to the selected port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
