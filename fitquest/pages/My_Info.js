import Head from "next/head";
import Image from "next/image";      
import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import NavBar from "@/components/NavBar";
import InputBox from "@/components/InputBox";
import Dropdown from "@/components/Dropdown";
import backdrop from "@/components/backdrop";
//for auth
import firebase_app from "@/library/firebaseConfig";
import{ database} from "@/library/firebaseConfig";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {doc, getDocs, updateDoc, collection, query, where} from 'firebase/firestore';


const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
  color: black;
  
}
`




export default function My_Info() {
  //this will be in every page for now.
  
  const [displayUser, setUser] = useState("Default");
  const auth = getAuth(firebase_app);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  onAuthStateChanged(auth, (user) => {
    if(user)
    {
      console.log('User is signed in');
      console.log(user.email);
      const userRef = collection(database, 'users');
      const q = query(userRef, where("email", '==', user.email));
      getDocs(q)
      .then((querySnapshot) => {
        console.log("entered:")
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUser(doc.data().name);
        });
        console.log("exited")
        
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
      // setUser(currentUser.name);

    }
    else
    {
      // direct user to sign-in page
      window.location.href = "/login";
      console.log('No user is signed in');
    }
  });
  const handleSubmission = (event) => {
    // Need to pull the selected dropdown, and the input in the input box, and attempt to update the user's info
    // with the field = selectedDropdown, and the value = inputBoxValue
    console.log("Submission attempt made"); 
    event.preventDefault();
    const inputBoxValue = document.getElementById("change_text").value;
    // Perform the update operation using selectedDropdown and inputBoxValue
    console.log("Selected Dropdown: ", selectedDropdown);
    console.log("Input Box Value: ", inputBoxValue);
    let field = selectedDropdown;
    let value = inputBoxValue;
    let currentUser = auth.currentUser.email;
    // Update the user's info with the field = selectedDropdown and the value = inputBoxValue  
    const userDoc = doc(database, 'users', currentUser);
    updateDoc(userDoc, {
      [field]: value
    })
    .then(() => {
      console.log('Document successfully updated!');
      setErrorMessage("Document successfully updated!")
    })
    .catch((error) => {
      console.error('Error updating document in the My_Info page: ', error);
      setErrorMessage("Error updating info")
    });
  }



    return ( <>
    {/* Need to Pull data from db, have no data nor have the db set up yet, so for now blank */}  
        {/* <backdrop>
          
        </backdrop> */}
        <ParentContainer>
        <NavBar/>
        <TitleContainer>My Info</TitleContainer>
        <BodyContainer>
            <Description>
                <h1>Your personal stats: </h1>
                <p>Current User: {displayUser}  </p>
                <p> Age: </p>
                <p> Weight: </p>
                <p> Height: </p>
            </Description>
            <InfoUpdateWindow>
                <h1>Update your information here!</h1>
                <Dropdown displayText= "Select" menu1 = "Age" menu2 = "Weight" menu3="Height" onSelect={(id)=> {
                  console.log("Selected: ", id);
                  setSelectedDropdown(id);
                  // Need to set the target of modification for the input box:
                }}/>
                {/* 
                <label htmlFor="category">Select a category:</label>
                <select id="category">
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select> */}
                <br/>
         
                <p>Selected Currently: {selectedDropdown}</p>
                <InputBox id = "change_text" disabled={selectedDropdown===null} /> 
                <ChangeInfoButton onClick={(event) => handleSubmission(event)}> Submit Changes</ChangeInfoButton>
                <br/>
                <p>
                    {errorMessage}
                </p>
            </InfoUpdateWindow>
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
