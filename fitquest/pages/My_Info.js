import Head from "next/head";
import Image from "next/image";      
import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import NavBar from "@/components/NavBar";



export default function My_Info() {
    return ( <>
    {/* Need to Pull data from db, have no data nor have the db set up yet, so for now blank */}        
        <NavBar/>
        <TitleContainer>Your Information</TitleContainer>
        <BodyContainer>
            <Description>
                <h1> My Info</h1>
                <h2> Name: </h2>
                <h2> Age: </h2>
                <h2> Weight: </h2>
                <h2> Height: </h2>
            </Description>
            <Description>
                <h1>Update your information here!</h1>
                <label htmlFor="category">Select a category:</label>
                <select id="category">
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>
                <input type="text" id="newInfo" placeholder="Enter new information" />                
            </Description>
            <Description>
            </Description>
        </BodyContainer>
    </>
    );
}



const TitleContainer = styled.div`
  font-size: 5.0vw;
  padding: 3vw;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #BAEDC1; //light-ish green  
`;




const BodyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #BAEDC1; //light-ish green
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
   background-color: #54D074;
   
   box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
  border-radius: 3%;
  margin-right: 2vw;
  margin-left: .1vw;
  padding: 2vw;
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif;
`;
