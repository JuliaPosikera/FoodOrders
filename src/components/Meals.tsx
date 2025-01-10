import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";
import { MealType } from "../components/types/item";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
const API = "http://localhost:3000";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
    sendRequest,
  } = useHttp<MealType[]>(`${API}/meals`, requestConfig, []);

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  if (!loadedMeals) {
    return;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        flexDirection={{ xs: "column", sm: "row" }}
        container
        spacing={{ xs: 2, md: 3 }}
        rowSpacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Grid size="grow">
            <Paper
              sx={{
                textAlign: "center",
              }}
            >
              LOADING MEALS...
            </Paper>
          </Grid>
        ) : (
          loadedMeals.map((meal) => (
            <Grid key={meal.id} size={{ xs: 2, sm: 3, md: 4 }}>
              <MealItem meal={meal} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
