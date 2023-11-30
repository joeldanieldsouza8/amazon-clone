import React from "react";
import "./Subtotal.css";
import { NumericFormat } from "react-number-format"; // Import NumericFormat
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "../reducer";

function Subtotal() {
  const [state, dispatch] = useStateValue();
  const { basket } = state;

  return (
    <div className="subtotal">
      <NumericFormat
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
        renderText={(value) => (
          <>
            <p>
              {/* Part of the hw */}
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
      />

      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
