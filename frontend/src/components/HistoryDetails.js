import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import TDEEContainer from './TDEEContainer';
import MacrosPieChart from './MacrosPieChart';
import MealPlanChart from './MealPlanChart';
import RecipeComponent from './RecipeComponent';

const HistoryDetails = () => {
  const { requestId } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestData = async () => {
      if (!auth.currentUser || !requestId) {
        setLoading(false);
        return;
      }

      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await axios.get(`http://127.0.0.1:5000/history/${requestId}`, {
          headers: { Authorization: idToken }
        });

        setRequestData(response.data);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [requestId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!requestData) return <div>No data available</div>;

  const { tdeeData, mealPlanData } = requestData;

  return (
    <div>
      {tdeeData && <TDEEContainer data={tdeeData} />}
      {tdeeData?.Macros && <MacrosPieChart macros={tdeeData.Macros} />}
      {mealPlanData?.meal_plan && <MealPlanChart mealPlanCSV={mealPlanData.meal_plan} />}
      {mealPlanData?.recipes && <RecipeComponent recipes={mealPlanData.recipes} />}
    </div>
  );
};

export default HistoryDetails;
