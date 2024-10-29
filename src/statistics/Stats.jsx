import styled from "styled-components";
import Stat from "./Stat";
import IncidentChart from "./IncidentChart";
import IncidentDuration from "./IncidentDuration";
import IncomingIncidents from "./IncomingIncidents";
import {
  HiOutlineCash,
  HiOutlineChat,
  HiOutlineCalculator,
} from "react-icons/hi";

// Styled components for the main container
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  max-width: 1200px; /* Limit the width for better readability */
  width: 100%;
`;

// Styled component for the Stats container
const StatsContainer = styled.div`
  display: flex;
  gap: 16px; /* Space between the Stat components */
  flex-wrap: wrap; /* Allow wrapping if there's not enough space */
  justify-content: center; /* Center align the Stats */
  margin-bottom: 20px; /* Space below the Stats */
`;

const RowContainer = styled.div`
  display: grid; /* Use grid layout */
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 10px; /* Space between the columns */
  width: 100%;
  height: 50%; /* Maintain the height */
  margin: 10px 0; /* Space above and below */
`;

// Common styles for information components
const InfoContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function Stats() {
  return (
    <StyledContainer>
      <StatsContainer>
        <Stat
          title="Reports"
          color="blue"
          icon={<HiOutlineCash />}
          // value={bookings} // Uncomment and use if needed
        />
        <Stat
          title="Chart"
          color="blue"
          icon={<HiOutlineChat />}
          // value={sales} // Uncomment and use if needed
        />
        <Stat
          title="Recent Incidents"
          color="blue"
          icon={<HiOutlineCalculator />}
          // value={checkins} // Uncomment and use if needed
        />
      </StatsContainer>

      <RowContainer>
        <InfoContainer>
          <IncomingIncidents />
        </InfoContainer>

        <InfoContainer>
          <IncidentDuration />
        </InfoContainer>
      </RowContainer>
      <InfoContainer>
        <IncidentChart />
      </InfoContainer>
    </StyledContainer>
  );
}

export default Stats;
