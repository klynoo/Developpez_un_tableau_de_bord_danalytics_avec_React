import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type KeyData = {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
};

type UserData = {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore: number;
  keyData: KeyData;
};

type Props = {
  data: UserData[];
};

const UserNutritionChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Clear previous chart content
      d3.select(chartRef.current).selectAll("*").remove();

      // Set up dimensions
      const width = 500;
      const height = 300;
      const margin = { top: 70, right: 30, bottom: 40, left: 40 };

      // Create SVG
      const svg = d3
        .select(chartRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Prepare data for D3
      const nutrients = [
        "calorieCount",
        "proteinCount",
        "carbohydrateCount",
        "lipidCount",
      ];
      const userData = data.map((d) => d.keyData);
      const x0 = d3
        .scaleBand()
        .domain(data.map((d) => d.userInfos.firstName))
        .rangeRound([0, width - margin.left - margin.right])
        .paddingInner(0.1);

      const x1 = d3
        .scaleBand()
        .domain(nutrients)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(userData, (d) =>
            Math.max(
              d.calorieCount,
              d.proteinCount,
              d.carbohydrateCount,
              d.lipidCount
            )
          ) || 1000,
        ])
        .rangeRound([height - margin.top - margin.bottom, 0]);

      // Add X axis
      svg
        .append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", (d) => `translate(${x0(d.userInfos.firstName)},0)`)
        .selectAll("rect")
        .data((d) =>
          nutrients.map((key) => ({
            key,
            value: d.keyData[key as keyof KeyData],
          }))
        )
        .join("rect")
        .attr("x", (d) => x1(d.key)!)
        .attr("y", (d) => y(d.value))
        .attr("width", x1.bandwidth)
        .attr("height", (d) => y(0) - y(d.value))
        .attr("fill", (d) => {
          switch (d.key) {
            case "calorieCount":
              return "#ff6b6b";
            case "proteinCount":
              return "#4ecdc4";
            case "carbohydrateCount":
              return "#ffcc00";
            case "lipidCount":
              return "#2a9d8f";
            default:
              return "#000";
          }
        });

      // Add Y axis
      svg.append("g").call(d3.axisLeft(y).ticks(5));

      // Add X axis labels
      svg
        .append("g")
        .attr(
          "transform",
          `translate(0,${height - margin.top - margin.bottom})`
        )
        .call(d3.axisBottom(x0));

      // Add chart title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("User Nutrition Data");
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default UserNutritionChart;
