function loadWorkouts() {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    for (let i = 0; i < workouts.length; i++) {
        let workout = workouts[i];

    // Create collapsible content for each saved workout
    let workoutContainer = document.getElementById("workoutContainer");
    let newCollapsible = document.createElement("button");
    newCollapsible.classList.add("collapsible");
    newCollapsible.textContent = workout.workoutTitle;

    let newContent = document.createElement("div");
    newContent.classList.add("content");
    newContent.innerHTML = `
        <p>Workout Type: ${workout.workoutType}</p>
        <p>Workout Intensity: ${workout.intensity}</p>
        <p>Workout Duration: ${workout.workoutDuration}</p>
        <p>Workout Description: ${workout.workoutDescription}</p>
        <p>Created By: ${workout.createdBy}</p>
        <button>Use Workout</button>
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

function init(){
    loadWorkouts();
}

window.addEventListener('load', init);