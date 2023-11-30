export const initialState = {
  basket: [],
};

// Selector
export function getBasketTotal(basket) {
  return basket?.reduce((amount, item) => item.price + amount, 0);
}

export default function reducer(state, action) {
  const { basket } = state;
  const { type, item, id } = action;

  console.log(action); // debug

  switch (type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...basket, item],
      };

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: basket.filter((item) => item.id !== id),
      }

    default:
      return state;
  }
}
