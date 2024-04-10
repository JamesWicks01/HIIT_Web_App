// Load existing data from local storage when the page loads
window.onload = function () {
  let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  // Display the saved workouts in the console
  console.log("Saved Workouts:", savedWorkouts);
};

function LoadDashboard() {
  window.location = "/";
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
  // Collect workout data
  let workoutData = {
    intensity: document.getElementById("intensity").value,
    title: document.getElementById("workoutTitle").value,
    type: document.getElementById("workoutType").value,
    description: document.getElementById("workoutDescription").value,
    createdBy: document.getElementById("createdBy").value,
    visibility: document.getElementById("visibility").value,
    exercises: [],
  };

  // Collect exercise data
  let exerciseNames = document.getElementsByName("exerciseName");
  let exerciseDurations = document.getElementsByName("exerciseDuration");
  for (let i = 0; i < exerciseNames.length; i++) {
    workoutData.exercises.push({
      name: exerciseNames[i].value,
      duration: parseInt(exerciseDurations[i].value),
    });
  }

  // Send data to server
  fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workoutData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle success
      console.log("Workout created:", data);
      clearForm();
    })
    .catch((error) => {
      // Handle error
      console.error("Error creating workout:", error);
    });
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

// Function to fetch and display all workouts
function displayAllWorkouts() {
  fetch("/workouts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((tasks) => {
      console.log("All workouts:", tasks);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
