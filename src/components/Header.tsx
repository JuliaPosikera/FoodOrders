import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContex";
import { useContext } from "react";
import UserProgressContex from "../store/UserProgressContex";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContex);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    //   <header id="main-header">
    //     <div id="title">
    //       <img src={logoImg} alt="main image " /> <h1>My Food</h1>
    //     </div>
    //     <nav>
    //       <Button textOnly onClick={handleShowCart}>
    //         <ShoppingCartIcon />({totalCartItems} )
    //       </Button>
    //     </nav>
    //   </header>
    // );return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(#29251c, #2c2306)" }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img
            src={logoImg}
            alt="main image"
            style={{
              width: "4rem",
              height: "4rem",
              objectFit: "contain",
              borderRadius: "50%",
              border: "2px solid #ffc404",
              marginRight: "1rem",
            }}
          />
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: "2rem",
              color: "#ffc404",
              letterSpacing: "0.2rem",
              textTransform: "uppercase",
            }}
          >
            My Food
          </Typography>
        </Box>

        <IconButton
          color="inherit"
          onClick={handleShowCart}
          sx={{
            fontFamily: "Lato, sans-serif",
            fontSize: "1.5rem",
            color: "#d9e2f1",
          }}
        >
          <Badge badgeContent={totalCartItems} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
