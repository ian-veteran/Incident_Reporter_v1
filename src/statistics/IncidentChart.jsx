import {
  Legend,
  Bar,
  CartesianGrid,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectIncidentSummaryByDate } from "../features/report/incidentSlice";

// Container for the whole chart
const StyledIncidentChart = styled.div`
  grid-column: 1 / -1;
  padding: 20px;
  border-radius: 8px;
  position: relative; // Ensure the container remains stable during updates

  /* Allow the chart to scroll if the data grows too large */
  overflow: auto;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// Title/header for the chart
const H1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0rem;
  margin-bottom: 1rem;
  color: indigo;
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  padding: 1rem 0;

  /* Background for better visibility if needed */
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#18212f" : "#fff")};
`;
function IncidentChart() {
  const incidentData = useSelector(selectIncidentSummaryByDate);

  const isDarkMode = true;
  const colors = isDarkMode
    ? {
        accident: "#ef4444",
        flood: "#f97316",
        earthquake: "#eab308",
        robbery: "#84cc16",
        landslide: "#293d24",
        drought: "#14b8a6",
        pandemic: "#3b82f6",
        fire: "#a855f7",
        other: "#ee09ee",
      }
    : {
        accident: "#c7d2fe",
        flood: "#fcd34d",
        earthquake: "#dcfce7",
        robbery: "#fde68a",
        landslide: "#f8cdd5",
        drought: "#ddd6fe",
        pandemic: "#dcfce7",
        fire: "#d1d5db",
        other: "#c2232d",
      };

  return (
    <StyledIncidentChart>
      <H1>Incident Chart</H1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={incidentData}
          margin={{ top: 5, right: 10, bottom: 10, left: 10 }} // Increased top margin
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#adaaaa" />
          <XAxis
            dataKey="date"
            tick={{ fill: isDarkMode ? "white" : "black" }}
            tickLine={{ stroke: isDarkMode ? "white" : "black" }}
          />
          <YAxis
            // tick={{ fill: isDarkMode ? "white" : "black" }}
            //tickLine={{ stroke: isDarkMode ? "white" : "black" }}
            label={{
              value: "Incident Count",
              angle: -90,
              position: "insideLeft",
              dx: -10,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#18212f" : "#fff",
              borderRadius: "8px",
              padding: "10px",
            }}
            formatter={(value, name) => {
              return [`${name}: ${value}`];
            }}
            cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
          />
          <Legend
            verticalAlign="bottom"
            height={30}
            wrapperStyle={{ paddingBottom: "5px" }}
          />
          {/* Dynamically render a Bar for each incident type */}
          {Object.entries(colors).map(([type, color]) => (
            <Bar
              key={type}
              dataKey={type}
              fill={color}
              name={type.charAt(0).toUpperCase() + type.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </StyledIncidentChart>
  );
}

export default IncidentChart;
