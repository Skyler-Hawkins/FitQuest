import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";               
import styled from 'styled-components';
import Link from 'next/link';


import NavBar from "@/components/NavBar";


export default function Fitness() {
    return (
        <>
            <NavBar/>

            <BodyContainer>
              <Description>
                    Add your exercises here!

              </Description>
            </BodyContainer>

    
        </>       
        );
    }



        
    const Description = styled.div`
    height: 20w;
    width: 50%;
    background-color: #2aad09;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3); 
    border-radius: 3%;
    margin-right: 2vw;
    margin-left: .1vw;
    padding: 2vw;
    font-family: 'Roboto', sans-serif;
    `;
    const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #70d158; //light-ish green
    position: relative;
  
  `;


