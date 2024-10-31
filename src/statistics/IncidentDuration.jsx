import React from "react";
import { useSelector } from "react-redux";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";

// Styled components
const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 0rem 1rem;
  grid-column: 3 / span 2;
  & > *:first-child {
    margin-bottom: 1.6rem;
  }
  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const H1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0rem;
  color: green;
  position: sticky;
  background-color: white;
  z-index: 1;
`;

// Define colors for each type
const colors = {
  Accident: "#ef4444",
  Flood: "#f97316",
  Earthquake: "#eab308",
  Robbery: "#84cc16",
  Landslides: "#22c55e",
  Drought: "#14b8a6",
  Pandemic: "#3b82f6",
  Explosion: "#a855f7",
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
    <ChartBox>
      <H1>Incident Summary Per Type</H1>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={startData}
            nameKey="duration"
            dataKey="value"
            innerRadius={80}
            outerRadius={120}
            cx="40%"
            cy="50%"
            paddingAngle={3}
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
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default IncidentDuration;
