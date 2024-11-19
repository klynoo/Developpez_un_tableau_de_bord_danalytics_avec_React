import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { UserPerformance } from "../UserMainDataTypes";

interface Props {
  data: UserPerformance;
}

// Transformer les données pour qu'elles soient compatibles avec le RadarChart
const transformData = (performanceData: UserPerformance) => {
  const { kind, data } = performanceData;
  return data.map((item) => ({
    value: item.value,
    kind: kind[item.kind as keyof typeof kind],
  }));
};

const renderPolarAngleAxisTick = (props: any) => {
  const { payload, x, y, cx, cy, ...rest } = props;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Calculer la différence entre la position du label et le centre
  const deltaX = (x - cx) * 1.2; // Ajustez le multiplicateur pour éloigner davantage
  const deltaY = (y - cy) * 1.2;

  return (
    <text
      x={cx + deltaX}
      y={cy + deltaY}
      textAnchor="middle"
      fill="#fff"
      fontSize={12}
      fontFamily="Roboto"
      fontWeight={500}
    >
      {capitalizeFirstLetter(payload.value)}
    </text>
  );
};

const PerformanceRadar: React.FC<Props> = ({ data }) => {
  const transformedData = transformData(data);

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        backgroundColor: "#282D30",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={transformedData} outerRadius="70%">
          <PolarGrid stroke="#FFFFFF" />
          <PolarAngleAxis dataKey="kind" tick={renderPolarAngleAxisTick} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceRadar;
