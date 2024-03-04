function LoadCreateWorkout() {
    window.location = 'workout-creator';
}

function LoadSearchedWorkout() {
    window.location = 'workout-searcher';
}

function LoadDailyWorkout() {
    window.location = 'daily-workout';
}

function ChangeWelcomeName() {
    const UserName = '[Name Here]';
    const Text = document.querySelector('#ReadyToWorkoutNameHere');
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

window.addEventListener('load', init);