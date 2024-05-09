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
//A function that deletes the selected workout
function DeleteWorkout(workoutID) {
  let popup = document.querySelector("#DeleteWorkout");
  let yesButton = document.querySelector("#yesButton");
  let noButton = document.querySelector("#noButton");
  let storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
  if (storedWorkouts) {
    //Displays the popup window the show are you sure you want to delete this
    popup.style.display = "block";
    yesButton.addEventListener("click", function () {
      //Filters out the workout with the specified ID
      let updatedWorkouts = storedWorkouts.filter(
        (workout) => workout.id !== workoutID
      );
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      //Reloads the page to reflect the changes
      location.reload();
      console.log("Workout Deleted");
    });
    noButton.addEventListener("click", function () {
      //Removes the popup window from the screen
      popup.style.display = "none";
    });
  }
}
//A function that loads all the workouts that are saved into the page
function loadWorkouts() {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  //Checks to see if the new user workout only exists
  //If it does then shows the message that the user doesn't have any workouts
  if (workouts.length <= 1) {
    let errorMessage = document.querySelector("#errorMessage");
    errorMessage.textContent = "You Have No Workouts That Are Yours";
    console.log("No Workouts are you own");
  }

  for (let i = 0; i < workouts.length; i++) {
    let workout = workouts[i];
    //Removes the workout that is created when a new user uses the web app
    if (workout.id != "exampleID") {
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
              <p>Workout Duration: ${workout.duration} seconds</p>
              <p>Workout Description: ${workout.description}</p>
              <p>Visibility: ${workout.visibility}</p>
              <p>Included Exercises:</p>
          `;

      //Loops through exercises and display each one
      let exerciseList = document.createElement("ul");
      workout.exercises.forEach((exercise) => {
        let exerciseItem = document.createElement("li");
        exerciseItem.textContent = `${exercise.name} - Duration: ${exercise.duration} seconds`;
        exerciseList.appendChild(exerciseItem);
      });
      newContent.appendChild(exerciseList);

      //Creates the button elements
      let startButton = document.createElement("button");
      startButton.id = workout.id;
      startButton.textContent = "START WORKOUT";

      let deleteButton = document.createElement("button");
      deleteButton.id = workout.id;
      deleteButton.textContent = "DELETE WORKOUT";

      //Attaches an event listener to the buttons
      startButton.addEventListener("click", function () {
        ActivateWorkout(workout.id);
      });
      deleteButton.addEventListener("click", function () {
        DeleteWorkout(workout.id);
      });
      //Appends the button to the new content
      newContent.appendChild(startButton);
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
}
// A function to load the dashboard page when called
function LoadDashboard() {
  window.location = "/";
}
// A fucntion when it is called that makes the buttons work when called
function init() {
  loadWorkouts();
  const BackButton = document.querySelector("#BackButton");
  BackButton.addEventListener("click", LoadDashboard);
}

window.addEventListener("load", init);
