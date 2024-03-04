function createworkout() {
    // Gets the values from the form
    let intensity = document.getElementById("intensity").value;
    let workoutTitle = document.getElementById("workoutTitle").value;
    let workoutType = document.getElementById("workoutType").value;
    let workoutDuration = document.getElementById("workoutDuration").value;
    let workoutDescription = document.getElementById("workoutDescription").value;
    let createdBy = document.getElementById("createdBy").value;

     // Define what is going into local storage 
    saveWorkoutToLocalStorage({
        intensity,
        workoutTitle,
        workoutType,
        workoutDuration,
        workoutDescription,
        createdBy
    }); 
    // Resets the form 
    document.getElementById("addWorkoutForm").reset();
};
//  Save the workout to local sotrage
function saveWorkoutToLocalStorage(workout) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
}