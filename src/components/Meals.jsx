import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "../components/UI/Error";

const API = "http://localhost:3000";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
    sendRequest,
  } = useHttp(`${API}/meals`, requestConfig, []);
  // const [loadedMeals, setLoadedMeals] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function fetchMeals() {
  //   try {
  //     const response = await fetch(`${API}/meals`);

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch meals");
  //     }

  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching meals:", error.message);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchMeals();
  // }, []);
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {isLoading ? (
        <p className="center">"LOADING MEALS... "</p>
      ) : (
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
      )}
    </ul>
  );
}
