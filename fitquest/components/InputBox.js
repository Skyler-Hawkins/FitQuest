import styled from 'styled-components';
import React from 'react';



// pulled from UIVERSE, converted to styled components via gpt
const Input = styled.input`

  // border: 2px solid transparent;
  width: 25em;
  height: 4em;
  padding-left: 0.8em;
  // outline: none;
  overflow: hidden;
  background-color: #F3F3F3;
  border-radius: 10px;
  transition: all 0.5s;
  border: 2px solid black;

  &:hover,
  &:focus {
    border: 2px solid #4A9DEC;
    box-shadow: 0px 0px 0px 7px rgba(74, 157, 236, 20%);
    background-color: white;
  }
`;

const Container = styled.div`
  /* Add any additional styles for the container here */
`;

const Label = styled.label`
  /* Add any additional styles for the label here */
`;



const InputBox = ({disabled, id}) => {
    return (
        <Container>
            <Input id = {id} required type="text" name="Update_Label" className="input" placeholder="Input Here" disabled={disabled}/>
        </Container>
    );
};

export default InputBox;

