import React from 'react';

interface BarData {
    label: string;
    value: number;
}

interface BarChartProps {
    data: BarData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    return (
        <div className="flex flex-col">
            {data.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                    <div className="h-4 bg-purple-700 text-white text-sm" style={{ width: `${item.value}%` }}>{item.value}</div>
                    <div className="ml-2 font-bold">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default BarChart;
