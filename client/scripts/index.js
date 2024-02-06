function LoadWorkoutCreator() {
    window.location = 'workout_creator.html';
}

function LoadWorkoutSearcher() {
    window.location = 'workout_searcher.html';
}

function init() {
    const WorkoutCreatorButton = document.querySelector("#create_workout");
    WorkoutCreatorButton.addEventListener("click", LoadWorkoutCreator);

    const WorkoutSearcherButton = document.querySelector("#search_workout");
    WorkoutSearcherButton.addEventListener("click", LoadWorkoutSearcher);
}

window.addEventListener("load", init);