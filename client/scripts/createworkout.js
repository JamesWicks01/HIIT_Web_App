//Load existing data from local storage when the page loads
window.onload = function () {
  let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  console.log("Saved Workouts:", savedWorkouts);
};
// A function to load the dashboard page when called 
function LoadDashboard() {
  window.location = "/";
}

//A function that creates a random id from a list of characters for an inputed length
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
//A function that creates the exercies elements when this function is called
function addExercise() {
  let exerciseNameInput = document.createElement("input");
  exerciseNameInput.type = "text";
  exerciseNameInput.name = "exerciseName";
  exerciseNameInput.required = true;

  let exerciseDurationInput = document.createElement("input");
  exerciseDurationInput.type = "text";
  exerciseDurationInput.name = "exerciseDuration";
  exerciseDurationInput.required = true;

  let exerciseInstructionInput = document.createElement("input");
  exerciseInstructionInput.type = "text";
  exerciseInstructionInput.name = "exerciseInstruction";
  exerciseInstructionInput.required = true;
  // Appends the  new inputs to the exercise section
  document
    .getElementById("exerciseSection")
    .appendChild(document.createTextNode("Exercise Name: "));
  document.getElementById("exerciseSection").appendChild(exerciseNameInput);
  document
    .getElementById("exerciseSection")
    .appendChild(document.createTextNode("Exercise Duration (Seconds): "));
  document.getElementById("exerciseSection").appendChild(exerciseDurationInput);
  document
  .getElementById("exerciseSection")
  .appendChild(document.createTextNode("Exercise Instruction"));
document.getElementById("exerciseSection").appendChild( exerciseInstructionInput);
}
//A function that creates a new workout
function createWorkout() {
  let id = generateRandomId(16);
  let intensity = document.getElementById("intensity").value;
  let title = document.getElementById("workoutTitle").value;
  let type = document.getElementById("workoutType").value;
  let description = document.getElementById("workoutDescription").value;
  let createdBy = document.getElementById("createdBy").value;
  let visibility = document.getElementById("visibility").value;
  let errorText = document.querySelector("#errorMessage");
  let exerciseNames = document.getElementsByName("exerciseName");
  let exerciseDurations = document.getElementsByName("exerciseDuration");
  let exerciseInstruction = document.getElementsByName("exerciseInstruction");

  let exercises = [];
  //Combinds all the exercise durations to create a total duration
  let totalDuration = 0;
  for (let i = 0; i < exerciseNames.length; i++) {
    let name = exerciseNames[i].value;
    let duration = parseInt(exerciseDurations[i].value);
    let instruction =  exerciseInstruction[i].value;
    exercises.push({ name: name, duration: duration, instruction: instruction });
    totalDuration += duration;
  }
  let duration = totalDuration.toString();

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
    console.log("Saved Workouts:", savedWorkouts);
    clearForm();
  }
}
//A function that clear the form when this function is called
function clearForm() {
  document.getElementById("intensity").value = "Low";
  document.getElementById("workoutTitle").value = "";
  document.getElementById("workoutType").value = "";
  document.getElementById("workoutDescription").value = "";
  document.getElementById("createdBy").value = "";
  let exerciseSection = document.getElementById("exerciseSection");
  while (exerciseSection.firstChild) {
    exerciseSection.removeChild(exerciseSection.firstChild);
  }
}
// A fucntion when it is called that makes the buttons work when called
function init() {
  const BackButton = document.getElementById("BackButton");
  BackButton.addEventListener("click", LoadDashboard);
  const AddExerciseButton = document.getElementById("AddExerciseButton");
  AddExerciseButton.addEventListener("click", addExercise);
  const CreateWorkoutButton = document.getElementById("CreateWorkoutButton");
  CreateWorkoutButton.addEventListener("click", createWorkout);
}
window.addEventListener("load", init);
