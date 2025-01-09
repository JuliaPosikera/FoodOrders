import { createContext, useState } from "react";

const UserProgressContex = createContext({
  progress: "", // "cart", "checkout"
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContexProvider({ children }: any) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    console.log("cart");
    setUserProgress("cart");
  }
  function hideCart() {
    console.log("hideCart");
    setUserProgress("");
  }
  function showCheckout() {
    console.log("checkout");
    setUserProgress("checkout");
  }
  function hideCheckout() {
    console.log("hideCheckout");
    setUserProgress("");
  }

  const userProgressContex = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContex.Provider value={userProgressContex}>
      {children}
    </UserProgressContex.Provider>
  );
}

export default UserProgressContex;
