import React from "react";
import "./Subtotal.css";
import { NumericFormat } from "react-number-format"; 
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();

  const [state, dispatch] = useStateValue();
  const { basket } = state;

  function handleCheckout() {
    navigate("/payment");
  }

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
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
      />

      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
