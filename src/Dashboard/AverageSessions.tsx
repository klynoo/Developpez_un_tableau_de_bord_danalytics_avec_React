import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserAverageSessions } from "../UserMainDataTypes";

interface Props {
  data: UserAverageSessions["sessions"];
}

// Formater les jours de la semaine
const formatDay = (day: number) => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  return days[day - 1];
};

// Composant personnalisé pour le Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "5px 10px",
          borderRadius: "5px",
          color: "#000",
          fontSize: "12px",
        }}
      >
        {`${payload[0].value} min`}
      </div>
    );
  }
  return null;
};

const AverageSessions: React.FC<Props> = ({ data }) => {
  // Ajouter des points fictifs pour toucher les bords
  const extendedData = [
    { day: 0, sessionLength: data[0]?.sessionLength || 0 }, // Point fictif à gauche
    ...data,
    {
      day: data.length + 1,
      sessionLength: data[data.length - 1]?.sessionLength || 0,
    }, // Point fictif à droite
  ];

  return (
    <div
      style={{
        width: "100%",
        height: 360,
        backgroundColor: "#FF0000",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <h3
        style={{
          color: "#FFF",
          fontFamily: "Roboto",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 500,
          position: "absolute",
          opacity: 0.504,
          top: "30px",
          left: "35px",
          zIndex: 1,
          width: "147px",
        }}
      >
        Durée moyenne des sessions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={extendedData} margin={{ top: 60, bottom: 20 }}>
          <XAxis
            dataKey="day"
            tickFormatter={(day) => (day > 0 && day <= 7 ? formatDay(day) : "")}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#ffffff", fontSize: 12, opacity: 0.504 }}
            fontFamily="Roboto"
            fontStyle="normal"
            fontWeight="500"
          />
          <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="basis"
            dataKey="sessionLength"
            stroke="#ffffff"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#ffffff",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessions;
