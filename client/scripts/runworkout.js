function runWorkout() {
  const workoutData = JSON.parse(localStorage.getItem("activeworkout"));

  let currentExerciseIndex = 0;
  let timeRemaining = workoutData.exercises[currentExerciseIndex].duration;
  let timer;

  function updateUI() {
    document.querySelector("#WorkoutTitle").textContent = workoutData.title;
    document.querySelector("#currentExerciseName").textContent =
      workoutData.exercises[currentExerciseIndex].name;
      document.querySelector("#currentExerciseDescription").textContent =
      workoutData.exercises[currentExerciseIndex].description;
    document.querySelector("#timeRemaining").textContent =
      "Time Remaining: " + timeRemaining + "s";
    document.querySelector("#nextExerciseName").textContent = workoutData
      .exercises[currentExerciseIndex + 1]
      ? workoutData.exercises[currentExerciseIndex + 1].name
      : "End of Workout";
    document.querySelector("#progress").style.width =
      ((workoutData.exercises[currentExerciseIndex].duration - timeRemaining) /
        workoutData.exercises[currentExerciseIndex].duration) *
        100 +
      "%";
  }

  // Countdown function
  function countdown() {
    timeRemaining--;
    updateUI();

    if (timeRemaining < 0) {
      clearInterval(timer);
      currentExerciseIndex++;
      if (currentExerciseIndex < workoutData.exercises.length) {
        timeRemaining = workoutData.exercises[currentExerciseIndex].duration;
        timer = setInterval(countdown, 1000);
      } else {
        alert("Workout Completed Well Done");
      }
    }
  }

  // Start Workout Function
  function startWorkout() {
    updateUI();
    timer = setInterval(countdown, 1000);
    console.log("Workout Started");
  }

  // Pause Workout Function
  function pauseWorkout() {
    clearInterval(timer);
    document.querySelector("#PauseButton").hidden = true;
    document.querySelector("#ResumeButton").hidden = false;
    console.log("Workout Paused");
  }

  // Resume Workout Function
  function resumeWorkout() {
    updateUI();
    timer = setInterval(countdown, 1000);
    document.querySelector("#PauseButton").hidden = false;
    document.querySelector("#ResumeButton").hidden = true;
    console.log("Workout Resumed");
  }

  // Exit Workout Fucntion
  function exitWorkout() {
    clearInterval(timer);
    currentExerciseIndex = 0;
    timeRemaining = workoutData.exercises[currentExerciseIndex].duration;
    updateUI();
    localStorage.removeItem("activeworkout");
    window.location = "/";
  }

  // Registering the Buttons in the page
  document
    .querySelector("#PauseButton")
    .addEventListener("click", pauseWorkout);
  document
    .querySelector("#ResumeButton")
    .addEventListener("click", resumeWorkout);
  document.querySelector("#ExitButton").addEventListener("click", exitWorkout);

  startWorkout();
}

window.addEventListener("load", runWorkout);
