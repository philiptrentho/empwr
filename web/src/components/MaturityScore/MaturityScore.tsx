import 'chart.js/auto';

import React from 'react';
import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

export default function MaturityScore() {
  const data = {
    labels: ['Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Negative',
        data: [1, 0, 0],
        backgroundColor: '#D9534F',
      },
      {
        label: 'Neutral',
        data: [0, 2, 0],
        backgroundColor: '#F0AD4E',
      },
      {
        label: 'Positive',
        data: [0, 0, 4],
        backgroundColor: '#5CB85C',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return OrgViewChart('Maturity Score', <Bar data={data} options={options} />);
}
