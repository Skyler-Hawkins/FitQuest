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
import {doc, getDocs, collection, query, where} from 'firebase/firestore';


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

  // console.log("auth: ", auth);

  
  // useEffect(() => {
  //   setUser();
  // }, []);  
    onAuthStateChanged(auth, (user) => {
      if(user)
      {
        console.log('User is signed in');
        console.log(user.email);
        //here, need to query current user's username

        // const userDocRef = doc(database, `users/${user.email.replace(/\./g, '_')}`);
        // getDoc(userDocRef)
        //   .then((userDocSnapshot) => {
        //     if (userDocSnapshot.exists()) {
        //       const userData = userDocSnapshot.data();
        //       console.log(userData.name);
        //       setUser(userData.name);
        //     } else {
        //       console.log(userDocRef)
        //       console.log("No such document!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("Error getting document:", error);
        //   });
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
            <Description>
                <h1>Update your information here!</h1>
                <Dropdown></Dropdown>
                {/* 
                <label htmlFor="category">Select a category:</label>
                <select id="category">
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select> */}
                <br/>
                <InputBox/>
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
