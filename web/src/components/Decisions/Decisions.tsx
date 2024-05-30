import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';
import { DecisionsProps } from '@/types/interfaces/types';

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
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Decisions({ topics, counts }: DecisionsProps) {
  const data = {
    labels: topics,
    datasets: [
      {
        label: 'Decisions per Topic',
        data: counts,
        backgroundColor: '#39B4E6',
      },
    ],
  };
  console.log(data);
  return (
    <OrgViewChart
      heading="Decisions per Topic"
      chart={<Bar data={data} options={options} />}
    />
  );
}
