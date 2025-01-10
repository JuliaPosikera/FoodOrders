import { useContext } from "react";
// import Modal from "./UI/Modal";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formatting";
// import Button from "./UI/Button";
import UserProgressContex from "../store/UserProgressContex";
import CartItem from "./CartItem";
import { Typography, Box, Button, Modal } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContex);
  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGotoCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      onClose={
        userProgressCtx.progress === "cart" ? handleCloseCart : undefined
      }
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          component="h3"
          color="textPrimary"
        >
          Your Cart
        </Typography>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid
            container
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
          >
            {cartCtx.items.map((item) => (
              <Grid key={item.id}>
                <CartItem
                  item={item}
                  onIncrease={() => cartCtx.addItem(item)}
                  onDecrease={() => cartCtx.removeItem(item.id, 1)}
                  onDelete={() => cartCtx.removeItem(item.id, item.quantity)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography
          variant="h6"
          align="right"
          sx={{ marginTop: 2, fontWeight: "bold" }}
          color="textPrimary"
        >
          Total: {currencyFormatter.format(cartTotal)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button variant="text" onClick={handleCloseCart}>
            Close
          </Button>
          {cartCtx.items.length > 0 && (
            <Button variant="contained" onClick={handleGotoCheckout}>
              Go to Checkout
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
