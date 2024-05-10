//Load existing data from local storage when the page loads
window.onload = function () {
  let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  console.log("Saved Workouts:", savedWorkouts);
};
//Functions that load the relavent page when the function is called
function LoadCreateWorkout() {
  window.location = "workout-creator";
}
function LoadSearchedWorkout() {
  window.location = "workout-searcher";
}
function LoadYourWorkouts() {
  window.location = "your-workouts";
}
//A function that checks to see if an ID exists in local storage workouts
function isIdExists(id) {
  let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  return savedWorkouts.some((workout) => workout.id === id);
}
//A function that creates a defult workout from new users to uses
function CreateExampleWorkout() {
  const ExampleWorkout = {
    id: "exampleID",
    intensity: "Low",
    title: "Beginner Full Body Workout",
    type: "Full Body",
    duration: 300,
    description:
      "A beginner-friendly full body workout to get you started on your fitness journey.",
    createdBy: "HIIT Web App Fitness Trainer",
    visibility: "Public",
    exercises: [
      {
        name: "Jumping Jacks",
        duration: 60,
        instruction:
          "Start with your feet together and hands at your sides, then jump your feet out to the sides while raising your arms overhead. Jump back to the starting position and repeat.",
      },
      {
        name: "Push-ups",
        duration: 60,
        instruction:
          "Start in a plank position with your hands shoulder-width apart, lower your body until your chest nearly touches the ground, then push back up to the starting position.",
      },
      {
        name: "Sit-ups",
        duration: 60,
        instruction:
          "Start by lying on your back with your knees bent and feet flat on the floor. Cross your arms over your chest or place your hands behind your head, then lift your upper body towards your knees, engaging your core muscles.",
      },
      {
        name: "Squats",
        duration: 60,
        instruction:
          "Start with your feet hip-width apart, lower your body by bending your knees and pushing your hips back, keeping your chest up and back straight, then return to the starting position by pushing through your heels.",
      },
      {
        name: "Plank",
        duration: 60,
        instruction:
          "Start in a push-up position with your hands shoulder-width apart and your body in a straight line from head to heels. Hold this position, keeping your core engaged and avoiding sagging or arching your back.",
      },
    ],
  };
  //Checks to see if the new user workout exists
  //If it does exist it will add the new user workout that is show above
  if (isIdExists(ExampleWorkout.id)) {
    console.log(`ID exists.`);
  } else {
    console.log(`ID does not exist.`);
    let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    savedWorkouts.push(ExampleWorkout);
    localStorage.setItem("workouts", JSON.stringify(savedWorkouts));
  }
}
// A fucntion when it is called that makes the buttons work when called
function init() {
  CreateExampleWorkout();
  const CreateWorkoutButton = document.querySelector("#createWorkout");
  CreateWorkoutButton.addEventListener("click", LoadCreateWorkout);

  const SearchWorkoutButton = document.querySelector("#searchWorkout");
  SearchWorkoutButton.addEventListener("click", LoadSearchedWorkout);

  const YourWorkoutsButton = document.querySelector("#yourWorkouts");
  YourWorkoutsButton.addEventListener("click", LoadYourWorkouts);
}
window.addEventListener("load", init);
