import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";

const defaultProvider = {
  cart: 0,
  userInfo: {},
  selectedAddress: {},
  localCart: 0,
  setLocalCart: () => {},
};

const DataContext = createContext(defaultProvider);

const DataProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useSelector((state) => state.reducer.loginReducer);

  useEffect(() => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("user_token");

    if (
      getLocalToken &&
      userData?.accessToken &&
      getPath[1] === "auth" &&
      getPath[2] === "login"
    ) {
      router.replace(`/`);
    }
  }, [userData, getPath, router]);

  const getPath = pathname.split("/");

  console.log(getPath);

  const [localCart, setLocalCart] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem("offline-cart")?.split("+")) ||
      []
  );
  const isOffline = () => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("user_token");
    if (userData?.accessToken && getLocalToken) {
      const decodedToken = jwt_decode(userData.accessToken); // Decode the JWT token
      const currentTime = Date.now() / 1000; // Get the current time in seconds

      // Check if the token is still valid based on its expiration time
      return decodedToken.exp < currentTime;
    }
    return !Boolean(getLocalToken);
  };

  const isAdmin = () => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("user_token");

    if (userData?.accessToken && getLocalToken) {
      const decodedToken = jwt_decode(userData.accessToken);
      return Boolean(decodedToken.role === "admin");
    }
    return false;
  };
  const handleLocalCartChange = (id) => {
    if (!isOffline()) {
      if (localCart.includes(id)) {
        setLocalCart((prev) => {
          const NewCart =
            typeof window !== "undefined" &&
            localStorage.getItem("offline-cart")?.split("+");
          return [...NewCart.filter((x) => x !== "")];
        });
      } else {
        setLocalCart(() => {
          const prev =
            (typeof window !== "undefined" &&
              localStorage.getItem("offline-cart")?.split("+")) ||
            [];
          return [...prev.filter((x) => x !== "")];
        });
      }
    }
  };

  //
  // fetch userInfo
  //
  const {
    data: userInfo,
    error: userErr,
    isLoading: userIsLoading,
  } = useSWR(!isOffline() && isAdmin() === false && "/user/get-account");

  const {
    data: adminInfo,
    error: adminErr,
    isLoading: adminIsLoading,
  } = useSWR(!isOffline() && isAdmin() && "/user/get-admin-account");
  //
  // fetch reviews
  //
  const {
    data: pendingReviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useSWR(!isOffline() && "/user/pending-reviews");
  //
  // fetch cart info
  //
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useSWR(!isOffline() ? "/user/cart" : null);

  const cartIds =
    !cartLoading && cartData?.data[0]
      ? cartData?.data[0].products?.map((x) => x.productId)
      : [];

  //
  //
  //
  //
  //

  const { data: myAddresses } = useSWR(!isOffline() && "/user/address");

  const filterAddress = myAddresses
    ? myAddresses.data.filter((x) => x.selected === true)
    : {};
  let selectedAddress = {};
  if (isOffline()) {
    selectedAddress = JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("offline-address")
    );
  } else {
    if (filterAddress.length < 1 && myAddresses) {
      selectedAddress = myAddresses[0];
    } else {
      selectedAddress = filterAddress[0];
    }
  }

  const cart = !isOffline() ? cartIds : localCart;

  console.log(adminInfo);
  return (
    <DataContext.Provider
      value={{
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
        adminInfo: (!adminErr && !adminIsLoading && adminInfo?.user) || {},
        myAddresses,
        selectedAddress,
        cart,
        cartData: cartData?.data[0] ? cartData?.data[0] : {},
        pendingReviews:
          (!reviewsError && !reviewsIsLoading && pendingReviews) || {},
        localCart,
        offline: isOffline(),
        handleLocalCartChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
