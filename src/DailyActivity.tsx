import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type DailyActivityData = {
  day: number;
  weight: number; // Poids en kg
  caloriesBurned: number; // Calories brûlées en kcal
};

type Props = {
  data: DailyActivityData[];
};

const DailyActivity: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Clear previous chart content
      d3.select(chartRef.current).selectAll("*").remove();

      // Set up dimensions
      const width = 700;
      const height = 300;
      const margin = { top: 50, right: 30, bottom: 50, left: 50 };

      // Create SVG
      const svg = d3
        .select(chartRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Prepare data for D3
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.day.toString()))
        .rangeRound([0, width - margin.left - margin.right])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          Math.max(
            d3.max(data, (d) => d.weight) || 70,
            d3.max(data, (d) => d.caloriesBurned) || 400
          ),
        ])
        .rangeRound([height - margin.top - margin.bottom, 0]);

      // Colors for weight and calories
      const color = { weight: "#282D30", caloriesBurned: "#E60000" };

      // Add X axis
      svg
        .append("g")
        .attr(
          "transform",
          `translate(0,${height - margin.top - margin.bottom})`
        )
        .call(d3.axisBottom(x).tickFormat((d, i) => `Jour ${d}`))
        .selectAll("text")
        .style("font-size", "12px");

      // Add Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y).ticks(3))
        .selectAll("text")
        .style("font-size", "12px");

      // Add bars for weight (black)
      svg
        .selectAll(".bar-weight")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-weight")
        .attr("x", (d) => x(d.day.toString())!)
        .attr("y", (d) => y(d.weight))
        .attr("width", x.bandwidth() / 2)
        .attr("height", (d) => y(0) - y(d.weight))
        .attr("fill", color.weight);

      // Add bars for calories burned (red)
      svg
        .selectAll(".bar-calories")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-calories")
        .attr("x", (d) => x(d.day.toString())! + x.bandwidth() / 2)
        .attr("y", (d) => y(d.caloriesBurned))
        .attr("width", x.bandwidth() / 2)
        .attr("height", (d) => y(0) - y(d.caloriesBurned))
        .attr("fill", color.caloriesBurned);

      // Add labels at the top of each bar
      svg
        .selectAll(".label-weight")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label-weight")
        .attr("x", (d) => x(d.day.toString())! + x.bandwidth() / 4)
        .attr("y", (d) => y(d.weight) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", color.weight)
        .text((d) => `${d.weight}kg`);

      svg
        .selectAll(".label-calories")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label-calories")
        .attr("x", (d) => x(d.day.toString())! + (3 * x.bandwidth()) / 4)
        .attr("y", (d) => y(d.caloriesBurned) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", color.caloriesBurned)
        .text((d) => `${d.caloriesBurned}kCal`);

      // Add legend
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - margin.right - 100}, -30)`);

      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color.weight);
      legend
        .append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text("Poids (kg)")
        .style("font-size", "12px");

      legend
        .append("rect")
        .attr("x", 80)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color.caloriesBurned);
      legend
        .append("text")
        .attr("x", 95)
        .attr("y", 10)
        .text("Calories brûlées (kCal)")
        .style("font-size", "12px");
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default DailyActivity;
