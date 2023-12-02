import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

import { useStateValue } from "./StateProvider";
import { useTransition, animated } from "react-spring";

function Checkout() {
  const [state, dispatch] = useStateValue();
  const { basket, user } = state;

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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
