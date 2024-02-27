
import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import NavBar from "@/components/NavBar";
import InputBox from "@/components/InputBox";
import Dropdown from "@/components/Dropdown";
import {useRouter} from 'next/router';
import firebase_app from "@/library/firebaseConfig";
import{database} from "@/library/firebaseConfig";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {doc, getDocs, updateDoc, collection, query, where} from 'firebase/firestore';


const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
  color: black;
  // background-color: #f2f2e6;  //very light grey


}
`
// The My_Info page
// This page is used to display the user's information, and allow them to update it.
// The user's information is pulled from the database, and displayed in the Description section.
// The user can then select a category to update, and input the new value in the input box.
// Most DB manipulation occurs from this page, as it is the most user-facing page, and while workout tracking is not yet implemented
// (and likely cannot be with the API I am using, as it is a very poor API in terms of variety or quality of data), it still
// satisfies the DB read and write requirements
// NOTE* I decided to leave the console logs in, as they are very useful for debugging, and I am not sure if I will have time to
// remove them before the project is due.


export default function My_Info() {
  //this will be in every page for now.
  // State variables: 
  // user, age, weight, and height variables to dynamically upadate current user's information
  const [displayUser, setUser] = useState("Default");
  const [displayAge, setAge] = useState("Default");
  const [displayWeight, setWeight] = useState("Default");
  const [displayHeight, setHeight] = useState("Default");
  const auth = getAuth(firebase_app);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  // The auth change is wrapped in a useEffect so I can redirect the user to the login page if they are not signed in
  // this was only possible in this way as compared to using windows.location.href, as that is a client-side operation
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log('User is signed in');
        console.log(user.email);
        const userRef = collection(database, 'users');
        const q = query(userRef, where("email", '==', user.email));
        getDocs(q)
        .then((querySnapshot) => {
          console.log("entered:")
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            console.log("AGE: " + doc.data().age);
            setUser(doc.data().name);
            setAge(doc.data().age);
            setWeight(doc.data().weight);
            setHeight(doc.data().height);
          });
          console.log("exited")
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
      } else {
        // direct user to sign-in page
        console.log('No user is signed in');
        router.push('/login');
      }
    });
  }, []);
  const handleSubmission = (event) => {
    //The WRITE operation for the database, using updateDoc to ensure no duplicates of user info such as height or weight
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
        <ParentContainer>
        <NavBar/>
        <TitleContainer>My Info</TitleContainer>
        <BodyContainer>
            <Description>
                <SmallerTitleContainer>Current User: {displayUser}  </SmallerTitleContainer>
                <StyledP> Age: {displayAge}</StyledP>
                <StyledP> Weight (in lbs): {displayWeight}</StyledP>
                <StyledP> Height (in inches): {displayHeight}</StyledP>
            </Description>
            <InfoUpdateWindow>
                <h1>Update your information here!</h1>
                {/* Sets the currently selected dropdown menu option to append to the DB */}
                <Dropdown displayText= "Select" menu1 = "age" menu2 = "weight" menu3="height" onSelect={(id)=> {
                  console.log("Selected: ", id);
                  setSelectedDropdown(id);
                  // Need to set the target of modification for the input box:
                }}/>

                <br/>
         
                <p>Changing: {selectedDropdown}</p>
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

// The styled components here are somewhat redundant similar to the index page, nonetheless I opted to leave them as they are
// so as to not mess up anything before deploying online
const SmallerTitleContainer = styled.div`
font-family: 'Roboto Serif', serif;
font-weight: 400;
font-style: bold;
font-size: 3.0vw;
font-curve: 1.5vw;
// padding: 3vw;
padding-bottom: .5vw;
align-items: center;
background-color: inherit;
justify-content: center;
text-align: center;
font-weight: bold;
// color: #FC984E;
`;


const StyledP = styled.p`
font-family: 'Roboto', sans-serif;
font-weight: 500;
font-style: bold;
font-size: 2.0vw;
font-curve: 1.5vw;
`


const TitleContainer = styled.div`
font-family: 'Roboto Serif', serif;
font-weight: 700;
// font-style: italic;
font-size: 6.0vw;
font-curve: 1.5vw;
padding: 3vw;
align-items: center;
justify-content: center;
text-align: center;
background-color: #f2f2e6;  //very light grey
font-weight: bold;
// color: #FC984E;
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
  height: 30vh;
  width: 60vw;
  // background-color: #067d0a;
  background-color: #f2f2e6;  //very light grey


  background: linear-gradient(to right, #b5b8f5, #c4c6f5); // Light gradient
  border: 3px solid black; // Solid border
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4); // Shadow for 3D effect
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
  background: linear-gradient(to right, #b5b8f5, #c4c6f5); // Light gradient
  border: 3px solid black; // Solid border
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4); // Shadow for 3D effect
  border-radius: 3%;
  margin-bottom: 5vw;
  padding: 2vw;
  padding-bottom: 5vw;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
`;

// This button also has several distinct duplicates acrosss the project, but some of them are tweaked for different size and such
// and while I am aware now of how to modify components dynanmically with props, it would be difficult for me to go and remove
// each button and consilidate it in a component file
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
box-shadow: 6px 6px 12px #6267d1, -6px -6px 12px #6267d1;

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
