import Head from "next/head";
import Link from "next/link";  
// import {Button} from 'react-bootstrap';
import styled from 'styled-components';

// import FitQuest from './FitQuest.png'




/*
Summary of what I've learned: 
Styled-components: 
    define all styled componenets above export default function
    can also define various JS event handlers for buttons up here, this is
    the preferred method of defining events, dont do inline
return function: 
    Define the HTML components there, can minimize actual html content with use of styled components 
    and other react components, such as react-bootstrap components
    Can import other componenets above for whatever purpose
*/


// Set all styled components 
const Container = styled.div`
    text-align: center;
    font-size: 1.5em;
`

// messing with styled componenets here: 
// this creates a wrapper around the section, of length 1em

// can wrap around components to style their whole section
// text-align: center; centers the element on the inside (button)
const Wrapper = styled.section`
    padding: 1em;
    background: black;
    text-align: center;
`

const Title = styled.h1`
    text-align: center;
 
    font-size: 3.0em;

`

// a button of this type is defined, need to set up event handlers for
// it as well... inheritance might be important, read that styled-components         
// can inheret from other styled componentsd
// this button doesn't appear to have an onclick event
const ButtonFancy = styled.button`
    align: center;
    width: 200px;
    color: #BF4F74;
    font-size: 1em;
    margin: auto;
    padding: 0.25em 1em;
    border: 2px solid #BF4F74;
    border-radius: 3px;
`

// need to define the handleClick function
function handleClick() {
    console.log('Button was clicked!');
}

export default function Login() {
    return (
        <>
        <Head>
            {/* Put meta-information here, likely to need that */}
        <title>Login Page</title>
        </Head>


        <img src = "./FitQuestLogo.jpg"></img>
        {/*Next, need to make a sign-up vs sign-in form, 
        make DEFAULT a sign-in page, then button that says
        "Don't have an account? Sign up here!" */}
        
        <wholeContainer>
        <TitleContainer>
            <Title>Welcome To FitQuest</Title>
        </TitleContainer>
       <LoginContainer>
       
          <LoginBox>
            <h1>Enter your username and password below</h1>
            <form>
                <InputGroup>
                    <Input type= "text" placeHolder = "Username"/>
                </InputGroup>
                <InputGroup>
                    <Input type = "password" placeHolder = "Password"/>
                </InputGroup>
                <InputGroup>
                    <LoginButton> Log In </LoginButton>
                </InputGroup>
            </form>
          </LoginBox>
       </LoginContainer>
       </wholeContainer>
        {/* <h2><Link href="/">Back to main file</Link></h2>
        <button onClick = {handleClick}>Click me!</button> */}

        {/* THIS here is a react-bootstrap imported button */}
        {/* <Button variant="contained">Sign Up </Button> */}
        </>
    )

}

// CSS FOR THE LOGIN PAGE
// should replace pixel paddings with relative sizing measurements     

const wholeContainer = styled.div`
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


