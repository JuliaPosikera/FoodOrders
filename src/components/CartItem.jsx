import { currencyFormatter } from "../util/formatting";

export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li key={item.id} className="cart-item">
      <p>
        {item.name} - {item.quantity} * {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
