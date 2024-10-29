import styled from "styled-components";

// Styled component for the Stat component
const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem; /* Added padding for a better look */
  display: grid;
  grid-template-columns: 4rem 1fr; /* Adjusted icon column size */
  grid-template-rows: auto auto; /* Simplified row definition */
  column-gap: 1rem; /* Space between the icon and text */
  row-gap: 0.3rem; /* Adjusted gap for better separation */
  flex: 1 1 calc(30% - 16px); /* Responsive width; adjusted to fit more items */
  min-width: 250px; /* Minimum width for each Stat */
  max-width: 350px; /* Added max-width for better control */
  height: auto; /* Allow dynamic height based on content */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.2s; /* Added transition for hover effect */

  &:hover {
    transform: translateY(-2px); /* Subtle lift effect on hover */
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1; /* Stretches the icon vertically */
  aspect-ratio: 1; /* Ensures the icon is a circle */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-${(props) => props.color}-100);
  width: 3rem; /* Set fixed width for consistency */
  height: 3rem; /* Set fixed height for consistency */

  & svg {
    width: 1.5rem; /* Adjusted icon size for better fit */
    height: 1.5rem; /* Adjusted icon size for better fit */
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: center; /* Center the title vertically */
  font-size: 1rem; /* Font size for title */
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
  margin: 0; /* Remove default margin for better alignment */
  /* padding-left: 0.5rem; */ /* Uncomment if you want some space */
`;

const Value = styled.p`
  font-size: 1.6rem; /* Font size for value */
  line-height: 1.2; /* Slightly increased line height for readability */
  font-weight: 500;
  margin: 0; /* Remove default margin for better alignment */
  text-align: left; /* Align text to the left for consistency */
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
