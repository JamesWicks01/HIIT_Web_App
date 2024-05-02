// Function to active the selected workout
function ActivateWorkout(workoutID) {
  let targetId = workoutID;
  // Retrieve the data from local storage.workouts
  let storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
  // Check if data exists and iterate over each entry
  if (storedWorkouts) {
    storedWorkouts.forEach((workout) => {
      // Check if the current workout has the target ID
      if (workout.id === targetId) {
        // Copy the selected workout data to another local storage called activeworkout and redirects to the run workout page
        localStorage.setItem("activeworkout", JSON.stringify(workout));
        console.log("Workout Activated");
        window.location = "/run_workout.html";
      }
    });
  }
}

function loadWorkouts() {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  for (let i = 0; i < workouts.length; i++) {
    let workout = workouts[i];

    // Check if visibility is public
    if (workout.visibility === "Public") {
      // Create collapsible content for each saved workout
      let workoutContainer = document.getElementById("workoutContainer");
      let newCollapsible = document.createElement("button");
      newCollapsible.classList.add("collapsible");
      newCollapsible.textContent = workout.title;

      let newContent = document.createElement("div");
      newContent.classList.add("content");
      newContent.innerHTML = `
            <p>Workout Type: ${workout.type}</p>
            <p>Workout Intensity: ${workout.intensity}</p>
            <p>Workout Duration: ${workout.duration}</p>
            <p>Workout Description: ${workout.description}</p>
            <p>Created By: ${workout.createdBy}</p>
            <p>Included Exercises:</p>
        `;

      // Loop through exercises and display each one
      let exerciseList = document.createElement("ul");
      workout.exercises.forEach((exercise) => {
        let exerciseItem = document.createElement("li");
        exerciseItem.textContent = `${exercise.name} - Duration: ${exercise.duration}`;
        exerciseList.appendChild(exerciseItem);
      });
      newContent.appendChild(exerciseList);

      // Create a button element
      let startButton = document.createElement("button");
      startButton.id = workout.id;
      startButton.textContent = "START WORKOUT";

      // Attach an event listener to the button
      startButton.addEventListener("click", function () {
        ActivateWorkout(workout.id);
      });

      // Append the button to the new content
      newContent.appendChild(startButton);

      // Set color based on intensity with transparency
      let intensityColor = "";
      if (workout.intensity.toLowerCase() === "low") {
        intensityColor = "rgba(18, 125, 24, 0.5)"; // Green
      } else if (workout.intensity.toLowerCase() === "medium") {
        intensityColor = "rgba(255, 165, 0, 0.5)"; // Orange
      } else if (workout.intensity.toLowerCase() === "high") {
        intensityColor = "rgba(255, 0, 0, 0.5)"; // Red
      } else {
        intensityColor = "rgb(0, 0, 0)";
      }
      newCollapsible.style.backgroundColor = intensityColor;

      // Append the collapsible content
      workoutContainer.appendChild(newCollapsible);
      workoutContainer.appendChild(newContent);

      // Add event listener to the collapsible
      newCollapsible.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
}

function LoadDashboard() {
  window.location = "/index.html";
}

function init() {
  loadWorkouts();
  const BackButton = document.querySelector("#BackButton");
  BackButton.addEventListener("click", LoadDashboard);
}

window.addEventListener("load", init);
