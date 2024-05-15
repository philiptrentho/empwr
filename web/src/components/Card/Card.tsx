import React from 'react';

interface CardProps {
  title: string;
  value: number | string;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      
    </div>
  );
};

export default Card;
