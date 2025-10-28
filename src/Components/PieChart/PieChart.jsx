import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ employees }) {
  const data = {
    labels: employees.map(emp => emp.score),
    datasets: [
      {
        // label: "Employee Scores",
        data: employees.map(emp => emp.score),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

const options = {
    responsive: true,
    plugins: {
      legend: { display: false } // hide legend
    },
    scales: {
      x: {
        grid: { display: false }, // hide x-axis grid
        ticks: { display: true } // hide x-axis labels
      },
      y: {
        grid: { display: false }, // hide y-axis grid
        ticks: { display: false } // hide y-axis numbers
        
      },
     
    }
  };

  return (
    <div className="border shadow-sm rounded-md p-4 mt-5  mx-auto">
      <h2 className="text-lg font-semibold mb-2">KPI Score Distribution</h2>
      <h4 className="font-bold mb-4">3.5</h4>
      <p>Last 30 days  <span className="text-green-400">+10 %</span></p>
      <div className="h-60 ">
        {/* h-60 is Tailwind, adjust to control height */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default BarChart;
