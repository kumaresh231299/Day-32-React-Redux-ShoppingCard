import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../Slice/CartSlice"


const store = configureStore({
    reducer: {
        cart: CartReducer //Store reducer(from_slice(CardReducer))
    }
})

export default store;