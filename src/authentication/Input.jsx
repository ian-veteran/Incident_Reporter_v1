import styled from "styled-components";

const Input = styled.input`
  border: 1px solid grey;
  background-color: slate;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  box-shadow: red;
  font-size: 1rem;
  color: black;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: red;
  }

  &:focus {
    outline: none;
    border-color: slate;
    box-shadow: 0 0 0 3px rgba(100, 150, 255, 0.2);
    background-color: grey;
  }
`;

export default Input;
