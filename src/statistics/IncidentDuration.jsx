import React from "react";
import { useSelector } from "react-redux";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  background-color: grey-0;
  border: 1px solid grey-100;
  border-radius: border-radius-md;
  padding: 1rem;
  grid-column: 2 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    grid-column: 1 / span 2; /* Make ChartBox span full width on smaller screens */
    padding: 0.8rem; /* Reduce padding */
  }

  @media (max-width: 480px) {
    padding: 0.5rem; /* Further reduce padding on very small screens */
  }
`;

const H1 = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 0rem;
  color: green;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  font-family: "Times New Roman", Times, serif;

  /* Responsive font sizing */
  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Usage Example
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  /* For larger screens */
  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Define colors for each type
const colors = {
  Accident: "#ef4444",
  Flood: "#f97316",
  Earthquake: "#eab308",
  Robbery: "#84cc16",
  Landslide: "#293d24",
  Drought: "#14b8a6",
  Pandemic: "#3b82f6",
  Fire: "#a855f7",
  Other: "#ee09ee",
};

function IncidentDuration() {
  // Get incident data from Redux
  const incidents = useSelector((state) => state.incident.incidents);

  // Summarize data for the chart
  const startData = Object.entries(
    incidents.reduce((acc, incident) => {
      acc[incident.type] = (acc[incident.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, value]) => ({
    duration: type,
    value,
    color: colors[type] || "#ccc", // Default to grey if no color is found
  }));

  return (
    <Container>
      <ChartBox>
        <H1>Total Incidents Summary per Report</H1>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={startData}
              nameKey="duration"
              dataKey="value"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              cx="50%" /* Centers the pie chart more flexibly */
              cy="50%"
            >
              {startData.map((entry) => (
                <Cell
                  key={entry.duration}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="middle"
              align="right"
              width="25%"
              layout="vertical"
              iconSize={12}
              iconType="circle"
              /* Responsive adjustments for Legend */
              wrapperStyle={{
                top: 0,
                right: 0,
                fontSize: "0.8rem",
                maxWidth: "25%",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
    </Container>
  );
}

export default IncidentDuration;
