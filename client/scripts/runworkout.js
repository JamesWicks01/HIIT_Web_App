function ExitWorkout() {
  window.location = "/workout-searcher";
}

function init() {
  const ExitButton = document.querySelector("#ExitButton");
  ExitButton.addEventListener("click", ExitWorkout);
}

window.addEventListener("load", init);
