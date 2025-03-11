import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props {
  score: number; 
}

const ScoreChart: React.FC<Props> = ({ score }) => {
  const data = [
    { name: "Score", value: score },
    { name: "Remainder", value: 1 - score },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: 250,
        backgroundColor: "#FBFBFB",
        borderRadius: "5px",
        padding: "20px",
        position: "relative",
      }}
    >
      <h3
        style={{
          color: "#20253A",
          fontFamily: "Roboto",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        Score
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Cercle blanc au centre */}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            fill="#FFFFFF"
          />
          {/* Arc de progression avec extrémités arrondies */}
          <Pie
            data={data}
            startAngle={90}
            endAngle={450}
            innerRadius="70%"
            outerRadius="80%"
            dataKey="value"
            cornerRadius={10}
            stroke="none"
          >
            <Cell key="score" fill="#FF0000" />
            <Cell key="remainder" fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Texte centré */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -45%)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#20253A",
            fontFamily: "Roboto",
            fontSize: 26,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {`${(score * 100).toFixed(0)}%`}
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#74798C",
            margin: 0,
            marginTop: 5,
            width: "100px",
          }}
        >
          de votre objectif
        </p>
      </div>
    </div>
  );
};

export default ScoreChart;
