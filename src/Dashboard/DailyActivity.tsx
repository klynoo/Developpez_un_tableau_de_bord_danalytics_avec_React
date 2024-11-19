import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { UserActivity } from "../UserMainDataTypes";

interface Props {
  data: UserActivity["sessions"];
}

// Fonction pour formater le jour
const formatDay = (dateString: string) => {
  const day = dateString.split("-")[2];
  return day.startsWith("0") ? day.slice(1) : day;
};

// Composant personnalisé pour le Tooltip avec des types
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#E60000",
          color: "#ffffff",
          fontFamily: "Roboto",
          padding: "25px 10px",
          fontSize: "12px",
          lineHeight: "1.2",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>{`${payload[0].value} kg`}</p>
        <p style={{ margin: "30px 0 0 0" }}>{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
};

// Composant de légende personnalisé
const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{
        display: "flex",
        listStyleType: "none",
        padding: 0,
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            marginRight: index < payload.length - 1 ? 20 : 0,
            display: "flex",
            alignItems: "center",
            color: "#74798C", // Couleur du texte
            fontSize: 14, // Taille de la police
            fontFamily: "Roboto", // Police
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              backgroundColor: entry.color,
              borderRadius: "50%", // Pour avoir un cercle
              marginRight: 8,
            }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const DailyActivityChart: React.FC<Props> = ({ data }) => {
  const formattedData = data.map((d) => ({
    ...d,
    day: formatDay(d.day),
  }));

  return (
    <div
      style={{
        backgroundColor: "#FBFBFB",
        paddingTop: "20px",
        paddingBottom: "20px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "left",
          marginTop: "23px",
          marginBottom: "10px",
          marginLeft: "20px",
          color: "#333",
          fontFamily: "Roboto",
          fontSize: "15px",
        }}
      >
        Activité quotidienne
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={formattedData}
          margin={{ top: 50, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#DEDEDE"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{
              fill: "#9B9EAC",
              fontSize: 14,
              fontFamily: "Roboto",
            }}
            tickMargin={20}
          />
          <YAxis
            yAxisId="kilogram"
            dataKey="kilogram"
            orientation="right"
            tick={{
              fill: "#9B9EAC",
              fontSize: 14,
              fontFamily: "Roboto",
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            domain={["dataMin - 1", "dataMax + 1"]} // Pour ajuster l'échelle
          />
          <YAxis
            yAxisId="calories"
            dataKey="calories"
            hide={true} // Cacher le deuxième axe Y
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{ top: -40 }}
            content={<CustomLegend />}
          />
          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            name="Poids (kg)"
            fill="#282D30"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            name="Calories brûlées (kCal)"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivityChart;
