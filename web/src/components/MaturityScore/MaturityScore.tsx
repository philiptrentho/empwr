import 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

export default function MaturityScore() {
  const data = {
    labels: ['Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Negative',
        data: [1, 0, 0],
        backgroundColor: '#D36875',
      },
      {
        label: 'Neutral',
        data: [0, 2, 0],
        backgroundColor: '#F9D371',
      },
      {
        label: 'Positive',
        data: [0, 0, 4],
        backgroundColor: '#10b981',
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

  return (
    <OrgViewChart
      heading="Maturity Score"
      // @ts-expect-error
      chart={<Bar data={data} options={options} />}
    />
  );
}
