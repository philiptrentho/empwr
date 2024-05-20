import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

const data = {
  labels: ['Sep', 'Oct', 'Nov'],
  datasets: [
    {
      label: 'Linked to objectives',
      data: [2, 6, 10],
      borderColor: '#4D388E',
      backgroundColor: 'rgba(75, 0, 130, 0.2)',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Not linked',
      data: [1, 3, 7],
      borderColor: '#39B4E6',
      backgroundColor: 'rgba(0, 162, 255, 0.2)',
      borderWidth: 2,
      fill: false,
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      max: 12,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 15,
        padding: 10,
        font: {
          size: 14,
        },
      },
    },
  },
};

const Decisions: React.FC = () => {
  const chartRef = useRef<Chart<'line', number[], string> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newChartInstance = new Chart(canvasRef.current, {
        type: 'line',
        data,
        options,
      });
      chartRef.current = newChartInstance;
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <OrgViewChart heading="Decisions" chart={<canvas ref={canvasRef} />} />;
};

export default Decisions;
