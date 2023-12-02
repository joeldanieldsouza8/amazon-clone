import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { NumericFormat } from "react-number-format";

import moment from "moment"; // This is a library for formatting dates and times

function Order({ order }) {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="order">
      <h2>Order</h2>

      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>

      <p className="order__id">
        <small>{order.id}</small>
      </p>

      {/* Display the items in the order */}
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      <NumericFormat
        value={order.data.amount / 100} // The amount is in subunits of the currency
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
      />
    </div>
  );
}

export default Order;
