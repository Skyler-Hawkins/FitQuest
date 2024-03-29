import styled from 'styled-components';
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import firebase_app from "@/library/firebaseConfig";
import{database} from "@/library/firebaseConfig";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Dropdown from "@/components/Dropdown";
import {useState, useEffect, useRef} from 'react';
import GetStartedButton from "@/components/GetStartedButton";
import MyGlobalStyle from "@/components/GlobalStyle";

const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
  color: black;
}
`

// The Fitness file, responsible for giving the user a workout recommendation
// also houses the second api, as well as a bunch of state variables that have dynamic display


export default function Fitness() {
  // state variables: 
  // user, auth for authentication
  // selectedDropdown, errorMessage for the dropdowns
  // selected1-3 for the purpose of taking user inputs and converting them to a query for the API
  // the selected1-3Refs is to be able to pull the selected values from the dropdowns
  const [displayUser, setUser] = useState("Default");
  const auth = getAuth(firebase_app);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const selected1Ref = useRef(null);
  const selected2Ref = useRef(null);
  const selected3Ref = useRef(null);
  const [exercises, setExercises] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log("Theres a user!")
      } else {
        // direct user to sign-in page
        console.log('No user is signed in');
        router.push('/login');
      }
    });
  }, []);
  const handleClick = (event) => {
    // console.log("Clicked, " + selected1 + selected2 + selected3);
    // Here, would make API call, and output appropriate workout stats to the user
    // first, need to pull the selected values from the dropdowns
    // convert the selected values to a query for the API
    let muscleGroup = selected1Ref.current;
    let difficultyMeasure = selected2Ref.current;
    let workoutType = selected3Ref.current;
    // seems complicated, but all in the purpose of formatting api call so no edge cases where no query results
    let muscle;
    let difficulty;
    let type;
    if(difficultyMeasure === "Expert"){
      // the dataset literally contains hardly any expert exercises other than olympic, 
      // so just use intermediate: call it inflating the users ego!
      difficulty = "intermediate";
    }
    //need to format muscleGroup to fit the API standards: 
    //for a push workout: muscleGroup = "chest,shoulders,triceps"
    // so call an exercise for chest, shoulders, then triceps
    // for pull, call 2 exercises for back
    // and one for biceps
    // for legs, call one for quads, one for hamstrings, one for calves
    if(muscleGroup === "Push (Chest, Shoulders, Triceps)"){
      // make API call format for chest, shoulders, triceps
      muscle = "chest";
    }
    else if(muscleGroup === "Pull (Back, Biceps)"){
      //make the api call format for back, biceps
      muscle = "middle_back";
    }
    else {
      //make the api call format for legs
      muscle  = "quads";
    }

    // next, need to refine the search type: 
    // if the user searches cardio, then options limited
    // this data set is poorly labeled, changing to reflect more accuracy
    if (workoutType === "Cardio"){
      muscle = "quadriceps";
      type = "cardio";
      difficulty = "intermediate";
    }
    else if(workoutType === "Powerlifting"){
      if (muscle === "middle_back"){
        muscle = "lower_back";
      }
      if(muscle === "chest"){
        muscle = "triceps";
      }
      type = "powerlifting";
      difficulty="intermediate";
    }
    else {
      //type is strength
      type = "strength";
      if(muscle==="chest" || muscle === "middle_back"){
        difficulty="intermediate";
      }
    }

    console.log("Muscle: ", muscle);
    console.log("Difficulty: ", difficulty);
    console.log("Type: ", type);
    console.log("about to fetch");
    let url = `/api/exercises?muscle=${muscle}&difficulty=${difficulty}&type=${type}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Data: ", data);
      console.log(data);
      //format the data
      // next, need to output the exercises
      setExercises(data);
    }
    )
    .catch(error => console.error('Error:', error));
  }

    return (
        <>
        <MyGlobalStyle/>
          <ParentContainer>
          <NavBar/>
        <TitleContainer>Workout Recommender</TitleContainer>
        <BodyContainer>
            <Description>
                <h4>Based on your preferences, we provide a custom workout</h4>
              <WorkoutButtons>
                {/* Here is a large series of dropdown parameters that handle the users choice of inputs */}
              <Dropdown displayText = "Muscle Groups" menu1 = "Push (Chest, Shoulders, Triceps)" menu2 = "Pull (Back, Biceps)" menu3 = "Legs" onSelect={(id)=> { 
                  setSelected1(true); selected1Ref.current = id; console.log("ref of selected: " + selected1Ref.current); }}/> 
              <Dropdown displayText = "Workout Difficulty" menu1 = "Beginner" menu2 = "Intermediate" menu3 = "Expert" onSelect={(id)=> { 
                  setSelected2(true); selected2Ref.current = id; console.log("ref of selected: " + selected2Ref);}} />
              <Dropdown displayText = "Type Of Workout" menu1 = "Strength Training" menu2 = "Cardio" menu3 = "Powerlifting" onSelect={(id)=> {
                  setSelected3(true); selected3Ref.current = id; console.log("ref of selected: " + selected3Ref);}}/>
              </WorkoutButtons>
              <br/> <br/>
              <p>When your selections have been made, press the button </p>
              <GetStartedButton id = "Generate Workout" selected1 = {selected1} selected2 = {selected2} selected3 = {selected3} onClick={(event) => handleClick(event)}  />
              <p>
                  {errorMessage}
              </p>
            </Description>
            <DescriptionForExercise>
            <h3>Workout Plan</h3>
            <p>Based on your selections, we have generated a workout plan for you.</p>
            <ExerciseContainer>
              {/* the gpt-assisted format for breaking apart my queries' return results: an array of exercises  */}
            {Array.isArray(exercises) && exercises.slice(0, 1).map((exercise, index) => (
                      <div key={index}>
                        <ExerciseName>Exercise {index + 1}: {exercise.name}</ExerciseName>
                        <SetAndButtonRow><ExerciseSets>Set Count: {index + 3} x 10 Reps</ExerciseSets><ExerciseDescriptionButton> <StyledA href = "#E1">Description</StyledA> </ExerciseDescriptionButton></SetAndButtonRow>
                      </div>
                    ))}
            </ExerciseContainer>
            <ExerciseContainer>
            {Array.isArray(exercises) && exercises.slice(1, 2).map((exercise, index) => (
                      <div key={index}>
                        <ExerciseName>Exercise {index + 2}: {exercise.name}</ExerciseName>
                        <SetAndButtonRow><ExerciseSets>Set Count: {index + 4} x 10 Reps</ExerciseSets><ExerciseDescriptionButton><StyledA href = "#E2">Description</StyledA> </ExerciseDescriptionButton></SetAndButtonRow>
                      </div>
                    ))}
            </ExerciseContainer>
            <ExerciseContainer>
            {Array.isArray(exercises) && exercises.slice(2, 3).map((exercise, index) => (
                      <div key={index}>
                        <ExerciseName>Exercise {index + 3}: {exercise.name}</ExerciseName>
                        <SetAndButtonRow><ExerciseSets>Set Count: {index + 5} x 10 Reps</ExerciseSets><ExerciseDescriptionButton><StyledA href = "#E3">Description</StyledA> </ExerciseDescriptionButton></SetAndButtonRow>
                      </div>
                    ))}
            </ExerciseContainer>
            </DescriptionForExercise>




            <ExerciseInstructionsDiv>
                    {Array.isArray(exercises) && exercises.slice(0, 1).map((exercise, index) => (
                      <div key={index}>
                        <ExerciseName>Exercise {index + 1} Description: {exercise.name}</ExerciseName>
                        <ExerciseInstructions id="E1">Instructions: {exercise.instructions}</ExerciseInstructions>
                      </div>
                    ))}
                    <br/>
                    {Array.isArray(exercises) && exercises.slice(1, 2).map((exercise, index) => (
                      <div key={index}>
                      <ExerciseName>Exercise {index + 2} Description: {exercise.name}</ExerciseName>
                      <ExerciseInstructions id="E2">Instructions: {exercise.instructions}</ExerciseInstructions>
                    </div>
                    ))}
                    <br/>
                    {Array.isArray(exercises) && exercises.slice(2, 3).map((exercise, index) => (
                      <div key={index}>
                      <ExerciseName>Exercise {index + 3} Description: {exercise.name}</ExerciseName>
                      <ExerciseInstructions id="E3">Instructions: {exercise.instructions}</ExerciseInstructions>
                    </div>
                    ))}

                
            </ExerciseInstructionsDiv>
        </BodyContainer>
            </ParentContainer>
        </>       
        );
    }

// The CSS in this file is no different from the others, somewhat redundant yet would be highly
// time consuming to modularize, and I decided to focus on the quality of the website

const StyledA = styled.a`
  color: inherit;
  text-decoration: none;
`;


const ExerciseDescriptionButton = styled.button`
width: 7vw;  // relative to viewport width
height: 4vh;  // relative to viewport height
border: 0.2vw solid #315cfd;
border-radius: 45px;
transition: all 0.3s;
cursor: pointer;
background: white;
margin-right: 1.5vw;
margin-bottom: .5vw;
font-size: 1vw;  // relative to parent font size
font-weight: 550;
font-family: 'Montserrat', sans-serif;

&:hover {
  background: #315cfd;
  color: white;
  width: 9vw;
  font-size: 1.5vw;  // relative to parent font size
}
`;


const SetAndButtonRow = styled.div`
display: flex;
width: 100%;
background-color: inherit;
color: inherit;
// flex-direction: row;
justify-content: space-between;
align-items: center;

`;


const ExerciseContainer = styled.div`
width: 80%;
font-size: 1.0em;
border: 5px solid purple;
padding: .5vw;
border-radius: 10%;
transition: color 0.3s ease, font-weight 0.3s ease;

&:hover {
  background-color: #cf98ed; // Darker color
  // font-weight: bold; // More emphasis
}
`;


const ExerciseName = styled.h2`
  color: #333;
  font-size: 2.0vw;
`;
  

const ExerciseSets = styled.p`
  color: #666;
  font-size: 1.8vw;
`;


const ExerciseInstructions = styled.div`
  color: #666;
  font-size: 1.2vw;
`;


const TitleContainer = styled.div`
font-size: 5.0vw;
padding: 3vw;
align-items: center;
justify-content: center;
text-align: center;
background-color: #f2f2e6;  //very light grey
`;


const BodyContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
align-items: center;
height: 100%;
width: 100%;
// background-color: #37de3d; //light-ish green
// color: white;
position: relative;
padding-bottom: 5vw;
background-color: #f2f2e6;  //very light grey
`;


const DescriptionAndImageContainer = styled.div`
margin-top: 6vw;
margin-bottom: 12vw;
display: flex;
justify-content: space-between;
align-items: center;
`;


const ImgContainer = styled.div`
display: flex;
justify-content: center;
border-radius: 3%;
transform: scale(1.2);
box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
width: 20vw;
height: 20vw;     
margin-bottom: 0vw;
margin-top: 0vw;                       
margin-right: 10vw;
background-color: #042131;
padding: 3vw;
`;


const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60vh;
  width: 50vw;
  background: linear-gradient(to right, #b5b8f5, #c4c6f5); // Light gradient
  border: 3px solid Black; // Solid border
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); // Shadow for 3D effect
  border-radius: 3%;
  margin-bottom: 5vw;
  padding: 2vw;
  padding-bottom: 5vw;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
  `;


const ExerciseInstructionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 60vh; /* Modified property */
  width: 50vw;
  background: linear-gradient(to right, #b5b8f5, #c4c6f5); // Light gradient
  border: 3px solid black; // Solid border
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); // Shadow for 3D effect
  border-radius: 3%;
  margin-bottom: 5vw;
  padding: 2vw;
  padding-bottom: 5vw;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
`;


const DescriptionForExercise = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 50vh;
width: 50vw;
// background-color: #067d0a;
background: linear-gradient(to right, #b5b8f5, #c4c6f5); // Light gradient
border: 3px solid black; // Solid border
box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25); // Shadow for 3D effect
box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
border-radius: 3%;
margin-bottom: 5vw;
padding: 2vw;
padding-bottom: 5vw;
font-size: 1.5em;
font-family: 'Roboto', sans-serif;
`;



const WorkoutButtons = styled.div`
display: flex;
flex-direction: row;
`;




// MISC NOTES FROM THE DEVELOPMENT OF THIS FILE, Left here so whoever sees can see my thought process during dev time

// want a sideways series of dropdown boxes that give the user several selection criteria 
// for now I will just use the default buttons that I have been
// Based on user input, will construct a function that takes that and converts it to suitable query for the API, queries,
// then outputs the workout as a display to the user
// could also add completed workouts, number of compelted workouts, etc *** Needs more time, should limit scope to something simple ***
// WHEN ALL 3 DROPDOWNS HAVE BEEN SELECTED, I CAN THEN set the Submit Button to be enabled, also darken the color of the button
// make the text of the dropdown button be whatever is selected
// make simple chart w/ the sets and reps for the 3 exercises, make descriptions available below.

// correct display output for cardio (cant have sets and reps, give times... need more state vars!!!!)
// fix the My_Info page