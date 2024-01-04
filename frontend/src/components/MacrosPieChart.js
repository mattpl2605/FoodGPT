import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const MacrosPieChart = ({ macros }) => {
  if (!macros || !macros.protein_grams || !macros.carbs_grams || !macros.fat_grams) {
    return <p>No macros data available</p>;
  }

  // Sum up the total grams of all macros
  const totalGrams = macros.protein_grams + macros.carbs_grams + macros.fat_grams;

  // Check if totalGrams is zero to avoid division by zero
  if (totalGrams === 0) {
    return <p>Macro data is not sufficient for charting</p>;
  }

  // Calculate the percentages
  const proteinPercentage = (macros.protein_grams / totalGrams) * 100;
  const carbsPercentage = (macros.carbs_grams / totalGrams) * 100;
  const fatPercentage = (macros.fat_grams / totalGrams) * 100;

  // Prepare data for the pie chart
  const pieChartData = [
    { title: 'Protein', value: proteinPercentage, color: '#E38627' },
    { title: 'Carbs', value: carbsPercentage, color: '#C13C37' },
    { title: 'Fat', value: fatPercentage, color: '#6A2135' },
  ];

  return (
    <div>
      <h3>Macros Distribution</h3>
      <PieChart
        data={pieChartData}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        labelStyle={(index) => ({
          fill: pieChartData[index].color,
          fontSize: '5px',
          fontFamily: 'sans-serif',
        })}
        radius={42}
        labelPosition={112}
      />
    </div>
  );
};

export default MacrosPieChart;
