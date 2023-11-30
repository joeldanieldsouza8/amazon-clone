import { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data Layer to every component in the app
export function StateProvider({ reducer, initialState, children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {/* children refers to the entire app */}
      {children}
    </StateContext.Provider>
  );
}

// Pull information from the data layer
export function useStateValue() {
  return useContext(StateContext);
}
