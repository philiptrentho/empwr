import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MaturityScore: React.FC = () => {
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
            },
        },
    };

    return (
        <div className="maturity-score">
            <h2>Maturity Score</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default MaturityScore;