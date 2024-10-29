import styled from "styled-components";
import { useTodaysIncident } from "./useTodaysIncident";
import Spinner from "../ui/Spinner";
import TodayIncident from "./TodayIncident";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
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

function IncomingIncidents() {
  const { incident, isLoading } = useTodaysIncident;
  return (
    <StyledToday>
      <h1>Current Reported Incident</h1>

      {!isLoading ? (
        incident?.length > 0 ? (
          <TodayList>
            {incident.map((incident) => (
              <TodayIncident incident={incident} key={incident.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No Incidents Today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default IncomingIncidents;
