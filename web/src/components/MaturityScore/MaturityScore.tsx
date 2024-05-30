import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import OrgViewChart from '@/components/OrgViewChart/OrgViewChart';
import { useEffect, useState } from 'react';
import { getTeamInfo } from '@/components/Firebase/organizationData';

export default function MaturityScore() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sentiment per Team',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    const fetchSentimentScores = async () => {
      try {
        const teams = await getTeamInfo('organizationID1');
        const teamNames = teams.map(team => team.teamName);
        const sentiments = teams.map(team => team.severity);
        const backgroundColors = sentiments.map(sentiment => (sentiment >= 0 ? '#10b981' : '#f87171'));
        
        setData({
          labels: teamNames,
          datasets: [
            { //  dataset object similarly to Dev
              label: 'Sentiment per Team',
              data: sentiments,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sentiment scores:', error);
      }
    };

    fetchSentimentScores();
  }, []);

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