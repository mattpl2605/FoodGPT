import React from 'react';
import { useLocation } from 'react-router-dom';
import TDEEContainer from './TDEEContainer';
import MacrosPieChart from './MacrosPieChart';
import MealPlanChart from './MealPlanChart';
import RecipeComponent from './RecipeComponent';

const HistoryDetails = () => {
  const location = useLocation();
  const requestData = location.state?.item; // Retrieve data passed via navigate

  if (!requestData) return <div>No data available</div>;

  // Determine if the data is for calculations or meal plans
  const isCalculationData = requestData.hasOwnProperty('BMR'); // Adjust based on your data structure

  return (
    <div>
      {isCalculationData ? (
        <>
          {/* Render components for calculation data */}
          {requestData.Macros && <MacrosPieChart macros={requestData.Macros} />}
          <TDEEContainer data={requestData} />
        </>
      ) : (
        <>
          {/* Render components for meal plan data */}
          {requestData.meal_plan && <MealPlanChart mealPlanCSV={requestData.meal_plan} />}
          {requestData.recipes && <RecipeComponent recipes={requestData.recipes} />}
        </>
      )}
    </div>
  );
};

export default HistoryDetails;
