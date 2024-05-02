function LoadCreateWorkout() {
  window.location = "workout_creator.html";
}

function LoadSearchedWorkout() {
  window.location = "workout_searcher.html";
}

function LoadDailyWorkout() {
  window.location = "daily_workout.html";
}

function ChangeWelcomeName() {
  const UserName = "[Name Here]";
  const Text = document.querySelector("#ReadyToWorkoutNameHere");
  Text.textContent = `Ready To Workout ${UserName}`;
}

function init() {
  ChangeWelcomeName();
  const CreateWorkoutButton = document.querySelector("#createWorkout");
  CreateWorkoutButton.addEventListener("click", LoadCreateWorkout);

  const SearchWorkoutButton = document.querySelector("#searchWorkout");
  SearchWorkoutButton.addEventListener("click", LoadSearchedWorkout);

  const DailyWorkoutButton = document.querySelector("#dailyWorkout");
  DailyWorkoutButton.addEventListener("click", LoadDailyWorkout);
}

window.addEventListener("load", init);
