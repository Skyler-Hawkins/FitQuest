import Head from "next/head";
import styled from 'styled-components';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {auth} from '@/library/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase_app from "@/library/firebaseConfig";
import {database} from "@/library/firebaseConfig";
import {doc, setDoc, collection, addDoc} from 'firebase/firestore';


// AUTHENTICATION FROM SLIDES
// const email = "user@example.com";
// const password = "userpassword";

// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//         console.log('User ${user.email} signed up successfully');
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//         console.log('Error: ${errorCode} ${errorMessage}');
          
//     })





//  FOR NOW THE SIGN UP PAGE IS A DUPLICATE OF THE LOGIN PAGE ////////////////////////////////


// need to pull the input from the text and password Inputs upon the press of the 

// need to define the handleClick function
function handleClick() {
    console.log('Button was clicked!');
}




// on button click, need to: 
// 1) check if user and password are 'correct' (to come later)
// 2) if correct, redirect to the main page
// 3) if incorrect, allow form to refresh and show error message


export default function Login() {
    //DEFINING HOOKS (first for button)
    // also. since in a form group, will refresh page every time button is clicked

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = (event) => {

        // need to figure out how to conditionally prevent this. if password is
        // incorrect, then prevent default. if correct, then allow refresh
        event.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log('username:', username)
        console.log('email:', email);
        console.log('Password:', password);
        
        // NOTE, i am aware of the issue that if there is a DB issue where the DB doesnt set properly, this user will be assigned
        // without a document in the DB. If time permits, I will come back to this.
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(`User ${user.email} signed up successfully`);

            //on sign up, need to make a document with the id being the user's userID (will utilize email for this, since will be unique)
            const newDocData = { name: username, email: email };
            
            console.log("database: ", database);
            const docRef = doc(database, "users", email);
            setDoc(docRef, newDocData)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            setTimeout(() => {}, 1000);


            window.location.href = "/";



        })
        .catch((error) => {
            setErrorMessage(null);
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(`Error: ${errorCode} ${errorMessage}`);
            setTimeout(() => {}, 1000);
            setErrorMessage("invalid email/password combination");
            
              
        })
    

        // Perform login logic here

        
    };

    

    // const handleAttemptLogin = () => {
    //     attemptLogin("Login attempt was made");
    //     // not actually doing much yet
    //     console.log('Login attempt was made');
    // }

    return (
        <>
        <Head>
            {/* Put meta-information here, likely to need that */}
        <title>Login Page</title>
        </Head>
        
        

        {/*Next, need to make a sign-up vs sign-in form, 
        make DEFAULT a sign-in page, then button that says
        "Don't have an account? Sign up here!" */}
        
        <WholeContainer>
        <TitleContainer>
            <Title>Welcome To FitQuest</Title>
        </TitleContainer>
       <LoginContainer>
       
          <LoginBox>
            <h1>Input a Desired Username, Email, and Password</h1>
            
                <InputGroup>
                    <Input type= "text" placeholder = "Name" ref = {usernameRef}/>
                </InputGroup>
                <InputGroup>
                    <Input type= "text" placeholder = "Email" ref = {emailRef}/>
                </InputGroup>
                <InputGroup>
                    <Input type = "password" placeholder = "Password" ref = {passwordRef}/>
                </InputGroup>
                <InputGroup>
                    <LoginButton onClick={(event) => handleLogin(event)}> Sign Up </LoginButton>
                </InputGroup>
                <InputGroup>
                    <p>{errorMessage}</p>
                </InputGroup>
          
          </LoginBox>
       </LoginContainer>
       </WholeContainer>
        </>
    )

}

// CSS FOR THE LOGIN PAGE
// should replace pixel paddings with relative sizing measurements     




const WholeContainer = styled.div`
    height: 100%;
`



const TitleContainer = styled.div`
    font-size: 1.6em;
    // color: white;
    // background-color: #37de3d; //light-ish green
    background-color: #f2f2e6;  //very light grey

    `


const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    // background-color: #f0f2f5; //default grey
    // background-color: #37de3d; //light-ish green
    background-color: #f2f2e6;  //very light grey


`

const LoginBox = styled.div`
    width: 40%;
    padding: 5%;
    align-items: center;
    background-color: white;
    border-radius: 3%;
 
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);                             

`

const InputGroup = styled.div`
width: 100%; // Ensure input group takes full width of parent
margin-bottom: 5%;
margin-top: 5%;
display: flex;
justify-content: center; // Center the input elements horizontally
`;

const Input = styled.input`
    width: 100%;
    padding: 5%;
`

const LoginButton = styled.button`
    width: 30%;
    padding: 3%;
`
// End of Login CSS

const Holder = styled.div`
    display:flex;
    width: 100%;
    background-color: grey;
    justify-content: space-between;
    padding: 1vw;
`


const Title = styled.h1`
    text-align: center;
 
    font-size: 3.0em;

`