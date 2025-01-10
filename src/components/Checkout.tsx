// import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContex";
import UserProgressContex from "../store/UserProgressContex";
import { currencyFormatter } from "../util/formatting";
// import Input from "./UI/Input";
// import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Typography,
  Box,
  Button,
  TextField,
  Modal,
  FormControl,
} from "@mui/material";

const API = "http://localhost:3000";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

// type Order = { items: CartItemType[]; customer: Customer };

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContex);

  let {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${API}/orders`, requestConfig);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  async function checkoutAction(event: any) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    await sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      })
    );

    //     fetch(`${API}/orders`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         order: { items: cartCtx.items, customer: customerData },
    //       }),
    //     });
  }

  let actions = (
    <>
      <Button variant="text" onClick={handleClose}>
        Close
      </Button>
      <Button variant="contained">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <Box>
          <Typography variant="h4">Success!</Typography>
          <Typography>Your order was submitted successfully.</Typography>
          <Typography>We will call you within next few minutes</Typography>
          <Typography className="modal-actions">
            <Button onClick={handleFinish}>Okey</Button>
          </Typography>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
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
        <FormControl component="form" onSubmit={checkoutAction} fullWidth>
          <Typography variant="h3" color="textPrimary" gutterBottom>
            Checkout
          </Typography>
          <Typography gutterBottom>
            Total Amount: {currencyFormatter.format(cartTotal)}
          </Typography>
          <TextField
            variant="standard"
            label="Full Name"
            id="name"
            fullWidth
            slotProps={{ inputLabel: { sx: { color: "text.secondary" } } }}
          />
          <TextField
            variant="standard"
            label="E-Mail"
            id="email"
            fullWidth
            sx={{
              marginTop: 2,
            }}
            slotProps={{ inputLabel: { sx: { color: "text.secondary" } } }}
          />
          <TextField
            variant="standard"
            label="Street"
            id="street"
            fullWidth
            sx={{
              marginTop: 2,
            }}
            slotProps={{ inputLabel: { sx: { color: "text.secondary" } } }}
          />
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <TextField
              label="Postal Code"
              type="text"
              id="postal-code"
              fullWidth
              slotProps={{ inputLabel: { sx: { color: "text.secondary" } } }}
            />
            <TextField
              label="City"
              type="text"
              id="city"
              fullWidth
              slotProps={{ inputLabel: { sx: { color: "text.secondary" } } }}
            />
          </Box>
          {error && (
            <Typography
              color="error"
              sx={{ marginTop: 2, textAlign: "center" }}
            >
              Failed to submit order! {error}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 3,
            }}
          >
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained">Submit Order</Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
}
