// Load existing data from local storage when the page loads
window.onload = function () {
  let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  // Display the saved workouts in the console
  console.log("Saved Workouts:", savedWorkouts);
};

function LoadDashboard() {
  window.location = "/index.html";
}

// Function that creates a random id from a list of characters for an inputed length
function generateRandomId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function addExercise() {
  // Create new input elements for exercise
  let exerciseNameInput = document.createElement("input");
  exerciseNameInput.type = "text";
  exerciseNameInput.name = "exerciseName";
  exerciseNameInput.required = true;

  let exerciseDurationInput = document.createElement("input");
  exerciseDurationInput.type = "text";
  exerciseDurationInput.name = "exerciseDuration";
  exerciseDurationInput.required = true;

  // Append new inputs to the exercise section
  document
    .getElementById("exerciseSection")
    .appendChild(document.createTextNode("Exercise Name: "));
  document.getElementById("exerciseSection").appendChild(exerciseNameInput);
  document
    .getElementById("exerciseSection")
    .appendChild(document.createTextNode("Exercise Duration (Seconds): "));
  document.getElementById("exerciseSection").appendChild(exerciseDurationInput);
}

function createWorkout() {
  let id = generateRandomId(16);
  let intensity = document.getElementById("intensity").value;
  let title = document.getElementById("workoutTitle").value;
  let type = document.getElementById("workoutType").value;
  let description = document.getElementById("workoutDescription").value;
  let createdBy = document.getElementById("createdBy").value;
  let visibility = document.getElementById("visibility").value;
  let errorText = document.querySelector("#errorMessage");

  // Access exercise details
  let exerciseNames = document.getElementsByName("exerciseName");
  let exerciseDurations = document.getElementsByName("exerciseDuration");

  // Process exercise details as needed
  let exercises = [];
  let totalDuration = 0; // Initialize total duration
  for (let i = 0; i < exerciseNames.length; i++) {
    let name = exerciseNames[i].value;
    let duration = parseInt(exerciseDurations[i].value); // Parse duration to integer
    // Add your logic to handle exercise details
    exercises.push({ name: name, duration: duration });
    totalDuration += duration; // Add exercise duration to total duration
  }

  let duration = totalDuration.toString(); // Convert total duration to string

  // Save the workout data to local storage
  let workout = {
    id: id,
    intensity: intensity,
    title: title,
    type: type,
    duration: duration,
    description: description,
    createdBy: createdBy,
    visibility: visibility,
    exercises: exercises,
  };

  if (
    intensity === "" ||
    title === "" ||
    type === "" ||
    duration === "" ||
    description === "" ||
    createdBy === "" ||
    visibility === ""
  ) {
    errorText.textContent = "Please fill in all fields";
  } else {
    let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    savedWorkouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(savedWorkouts));

    // Logs the saved workouts in the console
    console.log("Saved Workouts:", savedWorkouts);

    // Clears the form after saving
    clearForm();
  }
}

function clearForm() {
  // Clear the form inputs
  document.getElementById("intensity").value = "Low";
  document.getElementById("workoutTitle").value = "";
  document.getElementById("workoutType").value = "";
  document.getElementById("workoutDescription").value = "";
  document.getElementById("createdBy").value = "";

  // Remove exercise inputs
  let exerciseSection = document.getElementById("exerciseSection");
  while (exerciseSection.firstChild) {
    exerciseSection.removeChild(exerciseSection.firstChild);
  }
}

function init() {
  const BackButton = document.getElementById("BackButton");
  BackButton.addEventListener("click", LoadDashboard);
  const AddExerciseButton = document.getElementById("AddExerciseButton");
  AddExerciseButton.addEventListener("click", addExercise);
  const CreateWorkoutButton = document.getElementById("CreateWorkoutButton");
  CreateWorkoutButton.addEventListener("click", createWorkout);
}

window.addEventListener("load", init);
