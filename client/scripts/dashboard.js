function LoadCreateWorkout() {
    window.location = 'workout_creator.html';
}

function LoadSearchedWorkout() {
    window.location = 'workout_searcher.html';
}

function init() {
    const CreateWorkoutButton = document.querySelector("#createWorkout");
    CreateWorkoutButton.addEventListener("click", LoadCreateWorkout);

    const SearchWorkoutButton = document.querySelector("#searchWorkout");
    SearchWorkoutButton.addEventListener("click", LoadSearchedWorkout);
}

window.addEventListener('load', init);