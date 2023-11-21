import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContex";
import { UserProgressContexProvider } from "./store/UserProgressContex";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContexProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressContexProvider>
    </CartContextProvider>
  );
}

export default App;
