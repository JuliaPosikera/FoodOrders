import { currencyFormatter } from "../util/formatting";
import { CartItemType } from "../components/types/item";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box, Button } from "@mui/material";

type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) {
  return (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography>
          {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onDecrease}
          sx={{ minWidth: "30px", padding: "4px 8px" }}
        >
          -
        </Button>
        <Typography variant="body1" sx={{ width: "30px", textAlign: "center" }}>
          {item.quantity}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={onIncrease}
          sx={{ minWidth: "30px", padding: "4px 8px" }}
        >
          +
        </Button>
        <DeleteIcon
          onClick={onDelete}
          sx={{
            color: "red",
            cursor: "pointer",
            "&:hover": { color: "darkred" },
          }}
        />
      </Box>
    </Box>
  );
}
