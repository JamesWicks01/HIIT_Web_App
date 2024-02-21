function LoadCreateWorkout() {
    window.location = 'workout-creator';
}

function LoadSearchedWorkout() {
    window.location = 'workout-searcher';
}

function init() {
    const CreateWorkoutButton = document.querySelector("#createWorkout");
    CreateWorkoutButton.addEventListener("click", LoadCreateWorkout);

    const SearchWorkoutButton = document.querySelector("#searchWorkout");
    SearchWorkoutButton.addEventListener("click", LoadSearchedWorkout);
}

window.addEventListener('load', init);