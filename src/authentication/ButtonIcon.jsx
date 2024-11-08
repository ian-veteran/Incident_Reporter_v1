import styled from "styled-components";

const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center; // Centers icon and text horizontally
  width: 50%; // Button takes up 50% of the sidebar width
  padding: 0.75rem;
  font-size: 1.5rem;
  background-color: #fca5a5;

  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  bottom: 1rem; // Positions the button 1rem above the bottom of the sidebar
  left: 25%; // Aligns the button's center to the middle of the sidebar
  transform: translateX(-25%); // Centers the button horizontally

  &:hover {
    background-color: #b91c1c;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
export default ButtonIcon;
