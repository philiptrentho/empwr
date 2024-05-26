import 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';

export default function MaturityScore() {
  const data = {
    labels: ['Vehicle Software', 'Platform systems'],
    datasets: [
      {
        label: 'Sentiment per Team',
        data: [0.4, -0.2],
        backgroundColor: ['#10b981', '#f87171'],
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
        display: false,
      },
    },
  };

  return (
    <OrgViewChart
      heading="Sentiment per Team"
      // @ts-expect-error
      chart={<Bar data={data} options={options} />}
    />
  );
}
