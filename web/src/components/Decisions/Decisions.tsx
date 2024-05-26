import { ChartOptions } from 'chart.js';
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
      label: 'Decisions per Topic',
      data: [10, 12, 9, 8, 8, 6, 5, 3, 2, 1],
      backgroundColor: '#39B4E6',
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
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Decisions: React.FC = () => {
  return (
    <OrgViewChart
      heading="Decisions per Topic"
      chart={<Bar data={data} options={options} />}
    />
  );
};

export default Decisions;
