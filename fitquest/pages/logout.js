import styled from 'styled-components';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {auth} from '@/library/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import MyGlobalStyle from '@/components/GlobalStyle';
import {getAuth, signOut} from 'firebase/auth';

export default function Logout() {

    //DEFINING HOOKS (first for button)
    // also. since in a form group, will refresh page every time button is clicked

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    
    // const auth = useContext(AuthContext)
    
    const {isLoggedIn, setIsLoggedIn} = auth;
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log('User signed out');
        }).catch((error) => {
          console.error('Error signing out: ', error);
        });
      };
    return (
        <>

        
        <MyGlobalStyle/>

        {/*Next, need to make a sign-up vs sign-in form, 
        make DEFAULT a sign-in page, then button that says
        "Don't have an account? Sign up here!" */}
        
        <WholeContainer>
        <TitleContainer>
            <Title>Welcome To FitQuest</Title>
        </TitleContainer>
       <LoginContainer>
       
          <LoginBox>
            <h1>Are you sure you want to log out?</h1>
            {/* <form> */}
                <InputGroup>
                
                    <GetStartedButton onClick={(event) => handleLogout(event)}> Log Out </GetStartedButton>
                   
                </InputGroup>
                <InputGroup> <p>Don't have an account? <StyledLink href="/signup"> Sign Up Here</StyledLink> </p></InputGroup>
            {/* </form> */}
          </LoginBox>
         
       </LoginContainer>
       </WholeContainer>
        </>
    );
}


// CSS FOR THE LOGIN PAGE
// should replace pixel paddings with relative sizing measurements     
const StyledLink = styled.a`
//  color: inherit;
    text-decoration: none;
    color: blue;

  `;
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
    // justify-content: center;
    text-align: center;
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

// const LoginButton = styled.button`
//     width: 30%;
//     padding: 3%;
// `
// // End of Login CSS

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