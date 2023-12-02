import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useTransition, animated } from "react-spring";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
  const navigate = useNavigate();

  const [state, dispatch] = useStateValue();
  const { basket, user } = state;

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true); // set to true because we don't know the client secret yet

  // We need to use useTransition to animate the items in the basket
  const transitions = useTransition(basket, {
    from: { transform: "translate3d(0, -20px, 0)", opacity: 0 },
    enter: (item, index) => async (next) => {
      await next({
        opacity: 1,
        transform: "translate3d(0, 0px, 0)",
        delay: index * 50,
      });
    },
    leave: { transform: "translate3d(0, -20px, 0)", opacity: 0 },
    keys: (item) => item.id,
    config: { tension: 170, friction: 14 },
  });

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    async function getClientSecret() {
      const response = await axios({
        method: "post", // we are making a post request
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // * 100 because we need to convert to cents
      });

      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret); // debug
  console.log("👱", user); // debug

  async function handleSubmit(event) {
    event.preventDefault();
    setProcessing(true);

    try {
      // Confirm the card payment
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        // Handle error
        setError(payload.error.message);
        setProcessing(false);
      } else {
        // Payment successful
        const paymentIntent = payload.paymentIntent; // get the payment intent

        // Save order to Firestore
        const ordersRef = collection(db, "users", user?.uid, "orders"); // create a reference to the orders collection
        const orderDoc = doc(ordersRef, paymentIntent.id); // create a reference to the order document

        // Set the order document
        await setDoc(orderDoc, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: "EMPTY_BASKET" });

        navigate("/orders", { replace: true }); // navigate to the orders page and replace the current page in the history stack so the user can't go back to the payment page
      }
    } catch (error) {
      // Handle any errors here
      setError(error.message);
      setProcessing(false);
    }
  }

  function handleChange(event) {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>

          <div className="payment__items">
            {/* We need to use transitions.map to animate the items in the basket */}
            {transitions((style, item) => (
              <animated.div style={style}>
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              </animated.div>
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* Stripe magic will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <NumericFormat
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                />

                <button disabled={disabled || processing || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
