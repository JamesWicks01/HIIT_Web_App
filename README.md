# HIIT UP2122177

## Installation
- Unzip the folder and open the folder in your terminal
- Run the following command `npm i` to install the packages that are required
- Once finished, run the following command then run `npm start` to start the server and program
- Once finished, run the following command then open your browser and run the following command `localhost:8080` to display the program

## Features
### Create Your Own Workout
This feature allows users to craft personalized workouts, seamlessly stored in LocalStorage and readily accessible in the workout searcher. Upon visiting the page, users utilize the form to curate their workout, inputting key details such as title, intensity, type, duration, creator information, and a comprehensive description. Additionally, they can effortlessly expand their routine by clicking the "Add Exercise" button, enabling the inclusion of an infinite number of exercises.

### Search For Workouts
This feature enables users to explore created workouts from the community and loaded from LocalStorage. Upon entering the page, users can simply click on the desired workout to access a comprehensive overview, including intensity, duration, type, creator details, incorporated exercises, and a detailed description. All this information seamlessly unfolds in a dropdown menu when the chosen workout is selected.

## Future Features
### Daily Workouts
This feature provides users with a daily workout sourced from the community-created database. The system autonomously selects a random workout from the collection every midnight, ensuring users receive a unique exercise routine each day.
### Public and Private Created Workouts
This feature grants users the flexibility to choose the visibility of their created workouts. When crafting a workout, users can opt to keep it private, exclusively accessible in their personal workout section. Alternatively, they can set it to public, allowing the workout to be visible in the community's workout searcher for broader usage.
### Run Your Own or a Community Workout
This feature enables users to initiate their chosen workout. The screen displays a countdown for the current exercise, previews what's coming up next in a corner, and includes a user-friendly pause button for the flexibility to pause the workout session at the user's request.

## Know Issues
- When using the workout searcher, the included exercises in the selected workout dropdown are displayed as "[Object, object]" instead of providing the more informative format of "[Exercise Name, Duration]."