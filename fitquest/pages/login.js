import Head from "next/head";
// import {Button} from 'react-bootstrap';
import styled from 'styled-components';



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
        {/*Next, need to make a sign-up vs sign-in form, 
        make DEFAULT a sign-in page, then button that says
        "Don't have an account? Sign up here!" */}
        <Title>Welcome To FitQuest</Title>

        <Container> Please enter your UserId and password below </Container>  


        <Wrapper><ButtonFancy> Special button </ButtonFancy></Wrapper>


        <button onClick = {handleClick}>Click me!</button>

        {/* THIS here is a react-bootstrap imported button */}
        {/* <Button variant="contained">Sign Up </Button> */}
        </>
    )

}




