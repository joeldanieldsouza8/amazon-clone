import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [state, dispatch] = useStateValue();
  const { basket, user } = state;

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Amazon Prime Day"
        />

        <div>
          {/* We need to use optional chaining here because there is a delay in the user being set in the StateProvider. The user is set in the useEffect in App.js, but the user is not set immediately when the app loads. */}
          <h3>Hello, {user?.email}</h3>

          <h2 className="checkout__title">Your shopping Basket</h2>

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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
