import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue(); 
  const { basket } = state;

  // console.log("This is the basket >>>", basket); // debug

  function addToBasket() {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        // id: id,
        // title: title,
        // image: image,
        // price: price,
        // rating: rating,
        id,
        title,
        image,
        price,
        rating,
      },
    });
  }

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {/* The below code will create an array of size rating and fill it with undefined values. */}
          {/* Then, we map over the array and return a star for each undefined value. */}
          {/* The key is needed for React to keep track of each star. */}
          {/* The index is needed to keep track of which star we are on. */}
          {/* The index starts at 0, so we add 1 to it to get the correct number of stars. */}
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt={title} />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
