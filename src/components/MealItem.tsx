import { currencyFormatter } from "../util/formatting";
// import Button from "./UI/Button";
import CartContext from "../store/CartContex";
import { useContext } from "react";
import { MealType } from "../components/types/item";
import {
  Card,
  CardMedia,
  Button,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";

const API = "http://localhost:3000";

export default function MealItem({ meal }: { meal: MealType }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 350,
        margin: "1rem auto",
        display: "flex",
        flexDirection: "column", // Встановлює вертикальну структуру
      }}
      key={meal.id}
    >
      <CardMedia
        component="img"
        height="150"
        image={`${API}/${meal.image}`}
        alt={meal.name}
        sx={{
          objectFit: "cover",
          borderBottom: "1px solid #444",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1, // Займає доступний простір
          display: "flex",
          flexDirection: "column",
          minHeight: "130px",
        }}
      >
        <Typography variant="h6" component="h3" gutterBottom>
          {meal.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#f1c40f", // Жовтий колір для ціни
          }}
        >
          {currencyFormatter.format(meal.price)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            color: "#bbb",
          }}
        >
          {meal.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "1rem",
          justifyContent: "center",
          flexShrink: 0, // Запобігає стисненню
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleAddMealToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
