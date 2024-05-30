import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        font: {
          size: 8,
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (tickValue: string | number): string | number | undefined {
          if (typeof tickValue === 'number') {
            return tickValue + '%';
          }
          return tickValue; // For string values, return as is
        },
      },
      max: 30,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function MeetingTimeChart({topics, times}) {
  const data = {
    labels: topics,
    datasets: [
      {
        label: 'Meeting Time Spent per Topic',
        data: times,
        backgroundColor: '#4D388E',
      },
    ],
  };
  return (
    <OrgViewChart
      heading="Meeting Time Spent per Topic"
      chart={<Bar data={data} options={options} />}
    />
  );
}
