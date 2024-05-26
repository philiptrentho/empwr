import { ChartOptions } from 'chart.js';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

const data = {
  labels: [
    'Project Updates',
    'Budget Discussions',
    'Team Coordination',
    'Client Feedback',
    'Technical Issues',
    'Strategy Planning',
    'Resource Allocation',
    'Performance Reviews',
    'Product Development',
    'Sales and Marketing',
  ],
  datasets: [
    {
      label: 'Meeting Time Spent per Topic',
      data: [25, 15, 20, 10, 10, 10, 5, 3, 2, 0],
      backgroundColor: '#4D388E',
    },
  ],
};

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
        callback: function (value: number) {
          return value + '%';
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

export default function MeetingTimeChart() {
  return (
    <OrgViewChart
      heading="Meeting Time Spent per Topic"
      chart={<Bar data={data} options={options} />}
    />
  );
}
