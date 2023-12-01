import "./CheckoutProduct.css";

import { useStateValue } from "./StateProvider";
import { forwardRef } from "react";

const CheckoutProduct = forwardRef(
  ({ id, title, image, price, rating }, ref) => {
    const [state, dispatch] = useStateValue();
    const { basket } = state;

    // console.log(id); // debug

    function removeFromBasket() {
      // remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id, // We need this because we need to know which item to remove from the basket
      });
    }

    return (
      <div ref={ref} className="checkoutProduct">
        <img src={image} alt={title} className="checkoutProduct__image" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>

          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>

          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={id + i}>⭐</p> // Combine the product id with index to create a unique key
              ))}
          </div>

          <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
