import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContex";
import UserProgressContex from "../store/UserProgressContex";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";
import { Customer } from "./types/customer";
import { CartItemType } from "./types/item";

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
      <Button textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  console.log(data);

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will call you within next few minutes</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okey</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={checkoutAction}>
        <h2>Checkout</h2>
        <p>total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail " type="email" id="email" />
        <Input label="Street " type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City " type="text" id="city" />
        </div>
        {error && <Error title="Failed submit Order!" message={error} />}
        <p className="modal-actions"> {actions}</p>
      </form>
    </Modal>
  );
}
