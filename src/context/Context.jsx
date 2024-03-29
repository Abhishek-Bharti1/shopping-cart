import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, filterReducer } from "./Reducers";
faker.seed(99);
const Cart = createContext();
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    inStock: faker.helpers.arrayElement([0, 3, 4, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));
const [state,dispatch] = useReducer(cartReducer,{
products:products,
cart:[],
});
const [filterState,filterDispatch] = useReducer(filterReducer,{
byStock:false,
byFastDelivery:false,
byRating:0,
searchQuery:""
  });
  return <Cart.Provider value={{state,dispatch,filterState,filterDispatch}}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = ()=>{
    return useContext(Cart);
}
