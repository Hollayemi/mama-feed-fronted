import { createContext, useState } from "react";
import useSWR from "swr";
import { isLoggedIn } from "../redux/state/slices/api/setAuthHeaders";

const defaultProvider = {
  cart: 0,
  localCart: 0,
  setLocalCart: () => {},
};

const DataContext = createContext(defaultProvider);

const DataProvider = ({ children }) => {
  const [localCart, setLocalCart] = useState(
    typeof window !== "undefined" && localStorage.getItem("offline-cart")?.split("+") || []
  );

  const handleLocalCartChange = (id) => {
    if (!isLoggedIn()) {
      if (localCart.includes(id)) {
        setLocalCart((prev) => {
          const NewCart = typeof window !== "undefined" && localStorage.getItem("offline-cart")?.split("+");
          return [...NewCart];
        });
      } else {
        setLocalCart(() => {
          const prev = typeof window !== "undefined" && localStorage.getItem("offline-cart")?.split("+") || [];
          return [...prev];
        });
      }
    }
  };

  const {
    data: pendingReviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useSWR("/user/pending-reviews");
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useSWR(isLoggedIn() ? "/user/cart" : null);
  console.log(cartData);
  const cartIds =
    !cartLoading && cartData?.data[0]
      ? cartData?.data[0].products?.map((x) => x.productId)
      : [];

  const cart = isLoggedIn() ? cartIds : localCart;
  return (
    <DataContext.Provider
      value={{
        cart,
        cartData: cartData?.data[0] ? cartData?.data[0] : {},
        pendingReviews:
          (!reviewsError && !reviewsIsLoading && pendingReviews) || {},
        localCart,
        offline: !isLoggedIn(),
        handleLocalCartChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
