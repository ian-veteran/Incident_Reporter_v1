import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectIncidentCount } from "../features/report/incidentSlice";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 1rem;
`;

const H1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: orange;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  font-family: "Times New Roman", Times, serif;
`;

const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const P1 = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #ff4500; /* Bright color for emphasis */
  margin: 0.5rem 0 1rem;
  text-align: center;
`;

function IncomingIncidents() {
  const totalIncidents = useSelector(selectIncidentCount);

  return (
    <StyledToday>
      <H1>Current Reported Incidents</H1>

      <H2>Confirmed Incidents</H2>
      <P1>Total Incidents: {totalIncidents}</P1>
    </StyledToday>
  );
}

export default IncomingIncidents;
