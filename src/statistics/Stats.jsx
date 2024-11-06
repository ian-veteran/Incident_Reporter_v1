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
  margin: 10px;
  width: 100%; // Full viewport width
  overflow: auto;
`;

// Styled component for the Stats container
const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: space-around;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  height: 50%;
  margin: 10px 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
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
