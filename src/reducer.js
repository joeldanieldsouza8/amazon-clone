export const initialState = {
  basket: [],
  user: null,
};

// Selector
export function getBasketTotal(basket) {
  return basket?.reduce((amount, item) => item.price + amount, 0);
}

export default function reducer(state, action) {
  const { basket } = state;
  const { type, item, id, user } = action;

  console.log(action); // debug

  switch (type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...basket, item],
      };

    case "REMOVE_FROM_BASKET":
      const index = basket.findIndex((basketItem) => basketItem.id === id); // find the index of the item in the basket
      let newBasket = [...basket]; // copy the basket

      if (index >= 0) {
        newBasket.splice(index, 1); // remove the item from the basket
      } else {
        console.warn(
          `Can't remove product (id: ${id}) as it's not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket, // set the basket to the new basket
      };

    case "SET_USER":
      return {
        ...state,
        user: user, // set the user to the currently logged in user
      };

    default:
      return state;
  }
}
