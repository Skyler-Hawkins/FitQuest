import Head from "next/head";
import styled from 'styled-components';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {auth} from '@library/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";



// AUTHENTICATION FROM SLIDES
const email = "user@example.com";
const password = "userpassword";

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('User ${user.email} signed up successfully');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log('Error: ${errorCode} ${errorMessage}');
          
    })








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

    const handleLogin = (event) => {

        // need to figure out how to conditionally prevent this. if password is
        // incorrect, then prevent default. if correct, then allow refresh
        event.preventDefault();


        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log('Username:', username);
        console.log('Password:', password);

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
            <h1>Enter your username and password below</h1>
            <form>
                <InputGroup>
                    <Input type= "text" placeholder = "Username" ref = {usernameRef}/>
                </InputGroup>
                <InputGroup>
                    <Input type = "password" placeholder = "Password" ref = {passwordRef}/>
                </InputGroup>
                <InputGroup>
                    

                    <LoginButton onClick={(event) => handleLogin(event)}> Log In </LoginButton>
                   
                </InputGroup>
            </form>
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
    background-color: #f0f2f5;
`

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #f0f2f5;
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