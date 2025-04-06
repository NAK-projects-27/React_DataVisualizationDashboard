import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Scatter, Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

interface PlotDisplayProps {
  data: any[];
  xAxis: string;
  yAxis: string;
  plotType: string;
}

const PlotDisplay: React.FC<PlotDisplayProps> = ({ data, xAxis, yAxis, plotType }) => {
  const chartData = useMemo(() => {
    if (data.length > 0 && xAxis && yAxis) {
      const yValues = data.map((entry) => entry[yAxis]);


      let datasets = [];
      if (plotType === 'scatter' || plotType === 'line') {
        datasets = [
          {
            label: `${xAxis} vs ${yAxis}`,
            data: data.map((entry) => ({
              x: entry[xAxis],
              y: entry[yAxis],
            })),
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ];
      } else if (plotType === 'bar') {
        datasets = [
          {
            label: `${xAxis} vs ${yAxis}`,
            data: data.map((entry) => ({
              x: entry[xAxis],
              y: entry[yAxis],
            })),
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ];
      } else if (plotType === 'pie') {
        datasets = [
          {
            data: yValues,
            backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(153,102,255,0.6)', 'rgba(255,159,64,0.6)'],
          },
        ];
      }

      return {
        datasets,
      };
    }

    return {
      datasets: [
        {
          label: 'Default Chart',
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
          ],
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    };
  }, [data, xAxis, yAxis, plotType]);

  const renderChart = () => {
    switch (plotType) {
      case 'line':
        return <Line data={chartData} options={{ responsive: true }} />;
      case 'bar':
        return <Bar data={chartData} options={{ responsive: true }} />;
      case 'scatter':
        return <Scatter data={chartData} options={{ responsive: true }} />;
      case 'pie':
        return <Pie data={chartData} options={{ responsive: true }} />;
      default:
        return <Scatter data={chartData} options={{ responsive: true }} />;
    }
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <h2>Plot: {xAxis} vs {yAxis} ({plotType})</h2>
      {renderChart()}
    </div>
  );
};

export default PlotDisplay;
