import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";               
import styled from 'styled-components';
import Link from 'next/link';
import NavBar from "@/components/NavBar";
//for auth
import firebase_app from "@/library/firebaseConfig";

import{ database} from "@/library/firebaseConfig";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Dropdown from "@/components/Dropdown";
import InputBox from "@/components/InputBox";
import {useState, useEffect} from 'react';
import {doc, getDocs, updateDoc, collection, query, where} from 'firebase/firestore';
import GetStartedButton from "@/components/GetStartedButton";

const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
  color: black;
}
`


// make custom workout recommendation: 
// based on a user's desired inputs (workout difficuilty, push, pull, legs, etc.)

export default function Fitness() {
  const [displayUser, setUser] = useState("Default");
  const auth = getAuth(firebase_app);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);

  const handleClick = (event) => {
    // console.log("Clicked, " + selected1 + selected2 + selected3);
    // Here, would make API call, and output appropriate workout stats to the user
  }
  onAuthStateChanged(auth, (user) => {

    if(user)
    { 
      // console.log('User is signed in');
      // console.log(user.email);
      // const userRef = collection(database, 'users');
      // const q = query(userRef, where("email", '==', user.email));
      // getDocs(q)
      // .then((querySnapshot) => {
      //   console.log("entered:")
      //   querySnapshot.forEach((doc) => {
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data());
      //     setUser(doc.data().name);
      //   });
      //   console.log("exited")
        
      // })
      // .catch((error) => {
      //   console.error("Error getting documents: ", error);
      // });
      // setUser(currentUser.name);
      console.log("Theres a user!")
    }
    else
    {
      // direct user to sign-in page
      window.location.href = "/login";
      console.log('No user is signed in');
    }
  });
    return (
        <>
          <ParentContainer>
          <NavBar/>
        <TitleContainer>Workout Recommender</TitleContainer>
        <BodyContainer>
            <Description>
                Based on your personal goals and preferences, we can recommend a workout plan for you.
              <WorkoutButtons>
              <Dropdown displayText = "Muscle Groups" menu1 = "Push (Chest, Shoulders, Triceps)" menu2 = "Pull (Back, Shoulders, Biceps)" menu3 = "Legs" onSelect={(id)=> { setSelected1(true);console.log("1 is selected", {selected1});  }}/> 
              <Dropdown displayText = "Workout Difficulty" menu1 = "Beginner" menu2 = "Intermediate" menu3 = "Advanced" onSelect={(id)=> { console.log("2 is selected"); setSelected2(true);}} />
              <Dropdown displayText = "Type Of Workout" menu1 = "Strength Training" menu2 = "Cardio" menu3 = "Powerlifting" onSelect={(id)=> { console.log("3 is selected"); setSelected3(true);}}/>
              </WorkoutButtons>
              <br/>
              <p>When your selections have been made, press the button </p>
              <GetStartedButton id = "Generate Workout" selected1 = {selected1} selected2 = {selected2} selected3 = {selected3} onClick={(event) => handleClick(event)}  />

              <p>
                  {errorMessage}
              </p>
            </Description>
        </BodyContainer>
            </ParentContainer>
        </>       
        );
    }


  
const TitleContainer = styled.div`
font-size: 5.0vw;
padding: 3vw;
align-items: center;
justify-content: center;
text-align: center;
// background-color: #37de3d; //light-ish green
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
height: 50vh;
width: 60vw;
// background-color: #067d0a;
background-color: #f2f2e6;  //very light grey


box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
border-radius: 3%;
margin-bottom: 5vw;
padding: 2vw;
padding-bottom: 5vw;
font-size: 1.5em;
font-family: 'Roboto', sans-serif;
`;
const InfoUpdateWindow = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 80vh;
width: 60vw;
// background-color: #067d0a;
background-color: #f2f2e6;  //very light grey
box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
border-radius: 3%;
margin-bottom: 5vw;
padding: 2vw;
padding-bottom: 5vw;
font-size: 1.5em;
font-family: 'Roboto', sans-serif;
`;




const ChangeInfoButton = styled.button`
display: inline-block;
transition: all 0.2s ease-in;
position: relative;
overflow: hidden;
z-index: 1;
color: #090909;
padding: 0.7em 1.7em;
cursor: pointer;
font-size: 1.2vw;
margin-top: 1.5vw;
font-weight: bold;
border-radius: 0.8em;
background: #e8e8e8;
border: 3px solid #e8e8e8;
box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

&:active {
color: #9094ec;
box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

&:before, &:after {
content: "";
position: absolute;
left: 50%;
transform: translateX(-50%) scaleY(1) scaleX(1.25);
top: 100%;
width: 140%;
height: 180%;
background-color: rgba(0, 0, 0, 0.05);
border-radius: 50%;
display: block;
transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
z-index: -1;
}

&:after {
left: 55%;
transform: translateX(-50%) scaleY(1) scaleX(1.45);
top: 180%;
width: 160%;
height: 190%;
background-color: #9094ec;
}

&:hover {
color: #ffffff;
border: 1px solid black;

&:before {
  top: -35%;
  background-color: #9094ec;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

&:after {
  top: -45%;
  background-color: #9094ec;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
}
`;

const WorkoutButtons = styled.div`
display: flex;
flex-direction: row;
`
// want a sideways series of dropdown boxes that give the user several selection criteria , make it fancy and pretty,
// for now I will just use the default buttons that I have been
// Based on user input, will construct a function that takes that and converts it to suitable query for the API, queries,
// then outputs the workout as a display to the user
// could also add completed workouts, number of compelted workouts, etc *** Needs more time, should limit scope to something simple ***
// WHEN ALL 3 DROPDOWNS HAVE BEEN SELECTED, I CAN THEN set the Submit Button to be enabled, also darken the color of the button