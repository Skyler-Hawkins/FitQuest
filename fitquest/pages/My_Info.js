import Head from "next/head";
import Image from "next/image";      
import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import NavBar from "@/components/NavBar";
import InputBox from "@/components/InputBox";
import Dropdown from "@/components/Dropdown";
import backdrop from "@/components/backdrop";


const ParentContainer = styled.div`
*{
  // padding: 0;
  flex-direction: row;
  font: Roboto;
  
}
`


export default function My_Info() {
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
                Name: <br/>
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
  width: 95vw;
  // background-color: #067d0a;
  background-color: #f2f2e6;  //very light grey


  box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
  border-radius: 3%;
  margin-right: 2vw;
  margin-bottom: 5vw;
  margin-left: .1vw;
  padding: 2vw;
  padding-bottom: 5vw;
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;
`;
