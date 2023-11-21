import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContex";
import { useContext } from "react";
import UserProgressContex from "../store/UserProgressContex";

export default function Header(props) {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContex);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="main image " /> <h1>My Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems} )
        </Button>
      </nav>
    </header>
  );
}
