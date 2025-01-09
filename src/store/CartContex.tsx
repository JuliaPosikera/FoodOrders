import { createContext, useReducer, ReactNode } from "react";
import { CartItemType, MealType } from "../components/types/item";

enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR_CART = "CLEAR_CART",
}
type State = {
  items: CartItemType[];
};
type ContextProviderProps = {
  children: ReactNode;
};
type CartContextInterface = {
  items: CartItemType[];
  addItem: (item: MealType) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

type AddItemAction = {
  type: ActionTypes.ADD_ITEM;
  item: MealType;
};

type RemoveItemAction = {
  type: ActionTypes.REMOVE_ITEM;
  id: string;
};

type ClearCartAction = {
  type: ActionTypes.CLEAR_CART;
};

type Actions = AddItemAction | RemoveItemAction | ClearCartAction;
const initialStateItems: CartItemType[] = [];
const CartContext = createContext({
  items: initialStateItems,
  addItem: (item: MealType) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
});

function cartReducer(state: State, action: Actions) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item: CartItemType) => {
        return item.id === action.item.id;
      }
    );
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item: CartItemType) => {
        return item.id === action.id;
      }
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }: ContextProviderProps) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item: MealType) {
    dispatchCartAction({ type: ActionTypes.ADD_ITEM, item });
  }
  function removeItem(id: string) {
    dispatchCartAction({ type: ActionTypes.REMOVE_ITEM, id });
  }

  function clearCart() {
    dispatchCartAction({ type: ActionTypes.CLEAR_CART });
  }

  const cartContext: CartContextInterface = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children} </CartContext.Provider>
  );
}

export default CartContext;
