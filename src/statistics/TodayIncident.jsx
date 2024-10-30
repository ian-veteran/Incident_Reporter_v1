import styled from "styled-components";
import Tag from "./Tag";
import { useDispatch } from "react-redux";


const StyledTodayIncident = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayIncident({ incident }) {
  const dispatch = useDispatch();
  const { id, type, time, location } = incident;

  const handleStatusToggle = () => {
    dispatch(toggleIncidentStatus({ id }));
  };

  return (
    <StyledTodayIncident>
      <Guest>{location}</Guest>
      <div>{time}</div>
      {type === "unconfirmed" ? (
        <Tag type="green">Reported</Tag>
      ) : (
        <Tag type="red">Dispatched</Tag>
      )}
    </StyledTodayIncident>
  );
}

export default TodayIncident;
