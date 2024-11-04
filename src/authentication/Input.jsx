import styled from "styled-components";

const Input = styled.input`
  padding: 0;
  font-size: 1rem;
  font-weight: 400;
  border: 1px solid black;
  border-radius: 6px;
  color: slate-200;
  background-color: slate-100;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    border-color: red;
  }

  &:focus {
    outline: none;
    border-color: green;
    box-shadow: 0 0 0 2px rgba(100, 150, 255, 0.3);
  }
`;

export default Input;
