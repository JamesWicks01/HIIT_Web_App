//A function to active the selected workout
function ActivateWorkout(workoutID) {
  let targetId = workoutID;
  //Retrieve the data from local storage
  let storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
  if (storedWorkouts) {
    storedWorkouts.forEach((workout) => {
      //Check if the current workout has the target ID
      if (workout.id === targetId) {
        //Copy the selected workout data to another local storage called activeworkout and redirects to the run workout page
        localStorage.setItem("activeworkout", JSON.stringify(workout));
        console.log("Workout Activated");
        window.location = "/run-workout";
      }
    });
  }
}
//A function to edit the selected workout
function EditWorkout(workoutID) {
  let storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
  if (storedWorkouts) {
    storedWorkouts.forEach((workout) => {
      if (workout.id === workoutID) {
        console.log("Editing workout with ID:", workoutID);
      }
    });
  }
}
//A function that deletes the selected workout
function DeleteWorkout(workoutID) {
  let storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
  if (storedWorkouts) {
    //Filters out the workout with the specified ID
    let updatedWorkouts = storedWorkouts.filter(
      (workout) => workout.id !== workoutID
    );
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    //Reloads the page to reflect the changes
    location.reload();
    console.log("Workout Deleted");
  }
}
//A function that loads all the workouts that are saved into the page
function loadWorkouts() {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  for (let i = 0; i < workouts.length; i++) {
    let workout = workouts[i];
    //Creates collapsible content for each saved workout
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
              <p>Visibility: ${workout.visibility}</p>
              <p>Included Exercises:</p>
          `;

    //Loops through exercises and display each one
    let exerciseList = document.createElement("ul");
    workout.exercises.forEach((exercise) => {
      let exerciseItem = document.createElement("li");
      exerciseItem.textContent = `${exercise.name} - Duration: ${exercise.duration}`;
      exerciseList.appendChild(exerciseItem);
    });
    newContent.appendChild(exerciseList);

    //Creates the button elements
    let startButton = document.createElement("button");
    startButton.id = workout.id;
    startButton.textContent = "START WORKOUT";

    let editButton = document.createElement("button");
    editButton.id = workout.id;
    editButton.textContent = "EDIT WORKOUT";

    let deleteButton = document.createElement("button");
    deleteButton.id = workout.id;
    deleteButton.textContent = "DELETE WORKOUT";

    //Attaches an event listener to the buttons
    startButton.addEventListener("click", function () {
      ActivateWorkout(workout.id);
    });
    editButton.addEventListener("click", function () {
      EditWorkout(workout.id);
    });
    deleteButton.addEventListener("click", function () {
      DeleteWorkout(workout.id);
    });
    //Appends the button to the new content
    newContent.appendChild(startButton);
    newContent.appendChild(editButton);
    newContent.appendChild(deleteButton);

    //Sets color based on intensity
    let intensityColor = "";
    if (workout.intensity.toLowerCase() === "low") {
      intensityColor = "rgba(18, 125, 24, 0.5)";
    } else if (workout.intensity.toLowerCase() === "medium") {
      intensityColor = "rgba(255, 165, 0, 0.5)";
    } else if (workout.intensity.toLowerCase() === "high") {
      intensityColor = "rgba(255, 0, 0, 0.5)";
    } else {
      intensityColor = "rgb(0, 0, 0)";
    }
    newCollapsible.style.backgroundColor = intensityColor;

    //Appends the collapsible content
    workoutContainer.appendChild(newCollapsible);
    workoutContainer.appendChild(newContent);

    //Adds the event listener to the collapsible
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

function LoadDashboard() {
  window.location = "/";
}

function init() {
  loadWorkouts();
  const BackButton = document.querySelector("#BackButton");
  BackButton.addEventListener("click", LoadDashboard);
}

window.addEventListener("load", init);
