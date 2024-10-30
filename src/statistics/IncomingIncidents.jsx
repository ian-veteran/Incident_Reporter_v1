import styled from "styled-components";
import { useTodaysIncident } from "./useTodaysIncident";
import Spinner from "../ui/Spinner";
import TodayIncident from "./TodayIncident";
//import { selectIncidentCount } from "./src/features/report/incidentSlice.js";

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

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const H1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: orange;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
`;

function IncomingIncidents() {
  const { incidents, isLoading } = useTodaysIncident();

  const unconfirmedIncidents = incidents.filter(
    (incident) => incident.type === "unconfirmed"
  );
  const confirmedIncidents = incidents.filter(
    (incident) => incident.type === "confirmed"
  );

  return (
    <StyledToday>
      <H1>Current Reported Incidents</H1>
      {isLoading ? (
        <Spinner />
      ) : incidents.length > 0 ? (
        <>
          <h2>Unconfirmed Incidents</h2>
          <TodayList>
            {unconfirmedIncidents.map((incident) => (
              <TodayIncident incident={incident} key={incident.id} />
            ))}
          </TodayList>

          <h2>Confirmed Incidents</h2>
          <TodayList>
            {confirmedIncidents.map((incident) => (
              <TodayIncident incident={incident} key={incident.id} />
            ))}
          </TodayList>
        </>
      ) : (
        <NoActivity>No Incidents Today...</NoActivity>
      )}
    </StyledToday>
  );
}

export default IncomingIncidents;
