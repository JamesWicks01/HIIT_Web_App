# HIIT Web App
UP2122177

## Installation
- Unzip the folder and open the folder in your terminal
- Run the following command `npm i` to install the packages that are required
- Once finished, run the following command then run `npm start` to start the server and program
- Once finished, run the following command then open your browser and run the following command `localhost:8080` to display the program

## Features
### Community Workouts
- This feature enables the user to explore workouts that have been created by default when running the program for the first time, and any workouts that the user makes public from the "Create a Workout" section of the program.
- Upon entering the page, users can simply click or touch on the desired workout and see a comprehensive overview of the workout which includes:
  * Intensity
  * Total Duration
  * Type
  * Detailed Description 
  * The Creator's Details
  * Included Exercises with names and duration of that exercise 
- All the information is seamlessly displayed in a dropdown menu when the user chooses the workout and includes a button to run and delete the workout.
- This feature also includes a quick way of identifying the intensity of a workout with the box the user clicks or touches which includes the title of the workout being coloured differently with a high-intensity workout displayed as red, medium as orange and low as green.
- This feature currently only includes workouts that you create works that you set to public and the one default that is created when the program first starts up in the future a database will be implemented to enable users to create workouts for others to use.
  
### Your Workouts
- This feature enables the user to see the workout that they have created.
- Upon loading the page, the users are shown the same layout as the "Community Workouts" page with a click or touch of the desired workout and see a comprehensive overview of that workout with the removal of the Creator's Details to the visibility of Public or Private
All the information is seamlessly displayed in a dropdown menu when the user chooses the workout and includes a button to run and delete the workout.
- This feature also includes a quick way of identifying the intensity of a workout with the box the user clicks or touches which includes the title of the workout being coloured differently with a high-intensity workout displayed as red, medium as orange and low as green.
- When deleting a workout the user will see a pop-up display confirming if they are sure they want to delete that certain workout.
This feature's only way of editing a workout is by deleting it in the feature I aim to have a way of editing the workout's details and exercises included without creating a new one from scratch.

### Create Your Own Workout
- This feature allows the user to craft their own personalized workout, which is seamlessly stored in LocalStorage and readily accessible in the "Your Workouts" section of the program.
- Upon visiting this page, users can utilize the form to create their workout by inputting key details such as: 
  * Title
  * Intensity
  * Type
  * Creator Information
  * Comprehensive Description 
- Additionally, users can effortlessly expand their workout by clicking the "Add Exercise" button, enabling the inclusion of an infinite number of exercises within a workout by inputting the exercise's name, duration and instructions to the user.
When a workout is saved the duration for each exercise is combined and saved to create the main total duration.
- The users also have the choice to make their workout public enabling it to be seen on the "Community Workouts" page for other users to use or to keep it private enabling it to only be seen on the "Your Workouts" page.

### Run Your Own or a Community Workout
- This feature enables the user to run their chosen workout from either the "Community Workouts" page or "Your Workouts" page from the button "Run Workout".
- The screen displays the following information in this linear format:
  * The Title of the Workout
  * The Current Exercise
  * The Current Exercise User Instructions
  * A Progress Bar displays a visual cue on how long is left until the next exercise
  * The Time Remaining as an integer
  * The Next Exercise 
- The user also has two user-friendly pause and exit buttons for easy access to pause or exit the workout session at the user's request and then redirect the user back the the main program landing screen. The user also has the option to resume a workout when the pause button is clicked by clicking the "Resume" button. This button then automatically changes back to pause and the countdown resumes its countdown. 

### Mobile and Desktop Compatibility
- This program is compatible with mobile through an internet browser.
- Also, this program is compatible with Desktops through an internet browser and a downloadable allowing the program to be accessible on a laptop or computer without going to an internet browser.
- Additionally the user interface is the same on both mobile and desktop enabling the user to easily navigate through the program on these different devices 

## Future Features
This feature would be implemented into this program if I had the chance to improve this program into the future.
- Creating a SQLite Database and converting every from Local Storage into a database to enable the user to use this program on different devices and still have the workouts that they have created accessible on that new device.
- Having a login/registration system with authentication to enable the "Community Workouts" feature to work as intended.
- A way to edit existing workouts without deleting the workout and creating a new one from scratch.
- Creating a new feature called "Your Daily Workout" would provide users with a daily workout sourced from the community-created database. The system autonomously selects a random workout from the collection every midnight, ensuring users receive a unique exercise routine each day.
- Having this program work offline enables users to access the workouts that they have downloaded when an internet connection is not obtainable.

## Use of AI
### Prompt to develop the edit workout feature in "Your Workouts"
For this feature in the "Your Workouts" page I used this prompt to make the edit workout form into a pop up for above the orginal content of the page.
> How do you make a form to pop-up in the window.

From this prompt I made two different section called "popup" and "popup-content" and created the form over the section "popup" and called the form class "popup-content". Also added css to make the form popup over the exisitng content using these lines of css. 
```css
.popup {
  display: none; /* Hide the pop-up by default */
  position: fixed; /* Position the pop-up */
  z-index: 1; /* Make sure it appears above other elements */
}
```