function loadWorkouts() {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    for (let i = 0; i < workouts.length; i++) {
        let workout = workouts[i];

    // Create collapsible content for each saved workout
    let workoutContainer = document.getElementById("workoutContainer");
    let newCollapsible = document.createElement("button");
    newCollapsible.classList.add("collapsible");
    newCollapsible.textContent = workout.title;

    let newContent = document.createElement("div");
    newContent.classList.add("content");
    newContent.innerHTML = `
        <p>Workout Type: ${workout.type}</p>
        <p>Workout Intensity: ${workout.intensity}</p>
        <p>Workout Duration: ${workout.duration}</p>
        <p>Workout Description: ${workout.description}</p>
        <p>Created By: ${workout.createdBy}</p>
        <p>Included Exercises: ${workout.exercises}</p>
        <button>START WORKOUT</button>
    `;

    // Append the collapsible content
    workoutContainer.appendChild(newCollapsible);
    workoutContainer.appendChild(newContent);

    // Add event listener to the collapsible
    newCollapsible.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
        });
    }
}

function LoadDashboard() {
    window.location = "/"
}

function init(){
    loadWorkouts();
    const BackButton = document.querySelector("#BackButton");
    BackButton.addEventListener("click", LoadDashboard);
}

window.addEventListener('load', init);