function runWorkout() {
  // Retrieving the workout data from local storage
  const workoutData = JSON.parse(localStorage.getItem("activeworkout"));

  // Set initial values
  let currentExerciseIndex = 0;
  let timeRemaining = workoutData.exercises[currentExerciseIndex].duration;
  let timer;

  function updateUI() {
    document.querySelector('WorkoutTitle').innerText = workoutData.title;
    document.querySelector('currentExerciseName').innerText = workoutData.exercises[currentExerciseIndex].name;
    document.querySelector('timeRemaining').innerText = 'Time Remaining: ' + timeRemaining + 's';
    document.querySelector('nextExerciseName').innerText = workoutData.exercises[currentExerciseIndex + 1] ? workoutData.exercises[currentExerciseIndex + 1].name : 'End of Workout';
    document.querySelector('progress').style.width = ((workoutData.exercises[currentExerciseIndex].duration - timeRemaining) / workoutData.exercises[currentExerciseIndex].duration) * 100 + '%';

  }

}