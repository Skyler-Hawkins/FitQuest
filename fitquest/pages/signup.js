import Head from "next/head";
import styled from 'styled-components';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {auth} from '@/library/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase_app from "@/library/firebaseConfig";
import {database} from "@/library/firebaseConfig";
import {doc, setDoc, collection, addDoc} from 'firebase/firestore';
import MyGlobalStyle from "@/components/GlobalStyle";
import {useRouter} from 'next/router';







// on button click, need to: 
// 1) check if user and password are 'correct' (to come later)
// 2) if correct, redirect to the main page
// 3) if incorrect, allow form to refresh and show error message


export default function Login() {
    //DEFINING HOOKS (first for button)
    // also. since in a form group, will refresh page every time button is clicked
    const router = useRouter();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
    
        const username = usernameRef.current.value;
        const email = emailRef.current.value.toLowerCase();
        const password = passwordRef.current.value;
    
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(`User ${user.email} signed up successfully`);
    
            const newDocData = { name: username, email: email, age: "0", weight: "0", height: "0"};
            const docRef = doc(database, "users", email);
    
            setDoc(docRef, newDocData)
              .then(() => {
                console.log("Document successfully written!");
                
                setErrorMessage("Signed up successfully, redirecting...");
                setTimeout(() => {
                    // Code to be executed after 2.5 seconds
                }, 2500);
                // Redirect the user after they've signed up
                router.push('/');
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          })
          .catch((error) => {
            setErrorMessage(null);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error: ${errorCode} ${errorMessage}`);
            setTimeout(() => {}, 1000);
            setErrorMessage("invalid email/password combination");
          });
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
        <MyGlobalStyle/>
        <WholeContainer>
        <TitleContainer>
            <Title>Welcome To FitQuest</Title>
        </TitleContainer>
        <br/>
       <LoginContainer>
       
          <LoginBox>
            <h1>Input a Desired Username, Email, and Password</h1>
            
                <InputGroup>
                    <Input type= "text" placeholder = "Username" ref = {usernameRef}/>
                </InputGroup>
                <InputGroup>
                    <Input type= "text" placeholder = "Email" ref = {emailRef}/>
                </InputGroup>
                <InputGroup>
                    <Input type = "password" placeholder = "Password" ref = {passwordRef}/>
                </InputGroup>
                <InputGroup>
                    <GetStartedButton onClick={(event) => handleLogin(event)}> Sign Up </GetStartedButton>
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
    text-align: center;
    `;

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
    border-radius: 0.5vw;
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

const GetStartedButton = styled.button`
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