import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./../redux/reducers/movies";
export const store = configureStore({
reducer: { movies: moviesReducer }
});