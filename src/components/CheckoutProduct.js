import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, image, price, rating }) {
    const [state, dispatch] = useStateValue();
    const { basket } = state;

    function removeFromBasket() {
        // remove the item from the basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id, // We need this because we need to know which item to remove from the basket
        });
    }

  return (
    <div className="checkoutProduct">
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
              <p key={i}>⭐</p>
            ))}
        </div>

        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
