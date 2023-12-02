import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from "./components/Payment";
import NotFound from "./components/NotFound";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

// Load Stripe
const promise = loadStripe(
  "pk_test_51OIW1rF74TkSTgumCS9rzmrG61T9BLEfz7BPcQZacwChKmL8fpXT7B4jHiLDV3TYNyyyySLqXUeEdJHTInqPYvQ500ixHnfUiH"
);

function App() {
  const [{}, dispatch] = useStateValue();

  // The useEffect will only run once when the app component loads
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User is: ", authUser);

      if (authUser) {
        // The user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser, // set the user to the currently logged in user
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null, // set the user to null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            // path="/"
            index
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />

          <Route
            path="/payment"
            element={
              <>
                <Header />
                {/* Wrap the Payment component in the Elements component */}
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />

          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
