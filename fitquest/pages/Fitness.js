import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";               
import styled from 'styled-components';
import Link from 'next/link';


import NavBar from "@/components/NavBar";


const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
}
`



export default function Fitness() {
    return (
        <>
          <ParentContainer>
            <NavBar/>

            <BodyContainer>
              <ChallengeDescription>
               <h1> Challenge of The Month: </h1><br/>
                How Many Pushups Can You Do In 1 Minute?
              </ChallengeDescription>
              <Description>
                    Throw your hat into the ring!
                <InputGroup>
                  <Input type = "text" placeholder = "# Pushups per minute"/>
                
                </InputGroup>
              </Description>
              <Description>
                <h1> Leaderboard</h1>

              </Description>
            </BodyContainer>
            </ParentContainer>
        </>       
        );
    }

    const ChallengeDescription = styled.div`
    font-size: 1.6em;
    
    width: 80%;
    text-align: center;
    background-color: #067d0a;
    color: white;

    box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
    border-radius: 3%;
    margin-right: 2vw;
    margin-left: .1vw;
    padding: 2vw;
    font-family: 'Roboto', sans-serif;

    `

    const StyledLink = styled.a`
    color: inherit;
    text-decoration: none;
  `;
  
  const TitleContainer = styled.div`
    font-size: 5.0vw;
    padding: 3vw;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #37de3d; //light-ish green
  `;
  
  const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 100vw;
    background-color: #37de3d; //light-ish green
    position: relative;
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
    height: 20w;
    width: 50%;
    background-color: #067d0a;
    color: white;   
  
    box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
    border-radius: 3%;
    margin-right: 2vw;
    margin-left: .1vw;
    padding: 2vw;
    font-size: 1.2em;
    font-family: 'Roboto', sans-serif;
  `;
  

  /////////////// Below is copied from login.js, worrying about code org later
  
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
background-color: gainsboro;
`




  /*
  What I want my app to even do: 
  Track exercises
  Track weight
  Compete in fitness challenges

  idea: make a static 'challenge' for the time being, have users input their stats
  (i.e. how many pushups they can do in a minute, how many squats they can do in a minute, etc.)
  and then compare their stats to the static challenge, eventaully set up DB
  to display top scores... 
  
  
  
  */