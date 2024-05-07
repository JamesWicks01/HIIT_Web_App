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
function EditWorkout(workoutId) {
  // Retrieve workouts from local storage
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  // Find the workout with the provided ID
  let workoutIndex = workouts.findIndex(workout => workout.id === workoutId);
  if (workoutIndex !== -1) {
    let workout = workouts[workoutIndex];

    // Create a modal for editing workout details
    let popup = document.createElement("div");
    popup.classList.add("popup");

    // Modal content
    let popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    // Close button for the modal
    let closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", function() {
      popup.style.display = "none";
    });

    // Form for editing workout details
    let form = document.createElement("form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Update workout details
      workouts[workoutIndex].title = this.title.value;
      workouts[workoutIndex].type = this.type.value;
      workouts[workoutIndex].intensity = this.intensity.value;
      workouts[workoutIndex].duration = this.duration.value;
      workouts[workoutIndex].description = this.description.value;
      workouts[workoutIndex].createdBy = this.createdBy.value;
      // Update exercise details
      workouts[workoutIndex].exercises = [];
      let exerciseItems = document.querySelectorAll("#exercisesList li");
      exerciseItems.forEach(item => {
        let name = item.querySelector("input[name='exerciseName']").value;
        let duration = item.querySelector("input[name='exerciseDuration']").value;
        workouts[workoutIndex].exercises.push({ name, duration });
      });
      // Save updated workouts to local storage
      localStorage.setItem("workouts", JSON.stringify(workouts));
      // Close modal after submission
      popup.style.display = "none";
      // Refresh displayed workouts
      location.reload();
    });

    // Form fields pre-filled with existing workout details
    form.innerHTML = `
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" value="${workout.title}">
      <br>
      <label for="type">Type:</label>
      <input type="text" id="type" name="type" value="${workout.type}">
      <br>
      <label for="intensity">Intensity:</label>
      <input type="text" id="intensity" name="intensity" value="${workout.intensity}">
      <br>
      <label for="duration">Duration:</label>
      <input type="text" id="duration" name="duration" value="${workout.duration}">
      <br>
      <label for="description">Description:</label>
      <textarea id="description" name="description">${workout.description}</textarea>
      <br>
      <label for="createdBy">Created By:</label>
      <input type="text" id="createdBy" name="createdBy" value="${workout.createdBy}">
      <br>
      <label for="exercises">Exercises:</label>
      <ul id="exercisesList">
        ${workout.exercises.map(exercise => `
            <label for="exerciseName">Exercise Name:</label>
            <input type="text" name="exerciseName" value="${exercise.name}">
            <label for="exerciseDuration">Exercise Duration (Seconds):</label>
            <input type="text" name="exerciseDuration" value="${exercise.duration}">
        `).join('')}
      </ul>
      <input type="submit" value="Save">
    `;

    // Append elements to modal content
    popupContent.appendChild(closeButton);
    popupContent.appendChild(form);
    popup.appendChild(popupContent);

    // Append modal to the body
    document.body.appendChild(popup);

    // Display modal
    popup.style.display = "block";
  } else {
    console.error("Workout not found");
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
