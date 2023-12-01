import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";

function Payment() {
  const [state, dispatch] = useStateValue();
  const { basket, user } = state;

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
            {/* We need to use FlipMove to animate the items in the basket */}
            <FlipMove>
              {basket?.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* Stripe magic will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
