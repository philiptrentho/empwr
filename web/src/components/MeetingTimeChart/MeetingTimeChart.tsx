import { scales } from "chart.js";
import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { callback } from "chart.js/dist/helpers/helpers.core";
import { Weight } from "lucide-react";

const data = {
    labels: ['Sep', 'Oct', 'Nov'],
    datasets: [
        {
            label: 'Objectives',
            data: [40, 60, 50],
            backgroundColor: '#4D388E',
            borderColor: '#4D388E',
            borderWidth: 1,
        },
        {
            label: 'Other',
            data: [60, 40, 50],
            backgroundColor: '#39B4E6',
            borderColor: '#39B4E6',
            borderWidth: 1,
        },
    ]

}

const options = {
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
            beginAtZero: true,
            max: 100,
            ticks: {
                callback: function (value: number) {
                    return value + '%';
                },
            },
        }
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 15,
                padding: 10,
                font: {
                    size: 14,
                }
            }
        },
    }
};

const MeetingTimeChart: React.FC = () => {
    const chartRef = useRef<Chart<'bar', number[], string> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const newChartInstance = new Chart(canvasRef.current, { type: 'bar', data, options });
            chartRef.current = newChartInstance;
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        }
    }, []);

    return (
        <div className="w-full mxa-w-md p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-semibold mb-4">Meeting time</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default MeetingTimeChart;
