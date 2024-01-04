import React from 'react';
import { useLocation } from 'react-router-dom';
import TDEEContainer from './TDEEContainer';
import MacrosPieChart from './MacrosPieChart';
import MealPlanChart from './MealPlanChart';
import RecipeComponent from './RecipeComponent';

const ResultsScreen = () => {
  const location = useLocation();
  const { tdeeData, mealPlanData } = location.state || {};


  return (
    <div>
      {tdeeData && <TDEEContainer data={tdeeData} />}
      {tdeeData?.Macros && <MacrosPieChart macros={tdeeData.Macros} />}
      {mealPlanData?.meal_plan && <MealPlanChart mealPlanCSV={mealPlanData.meal_plan} />}
      {mealPlanData?.recipes && <RecipeComponent recipes={mealPlanData.recipes} />}
    </div>
  );
};

export default ResultsScreen;
