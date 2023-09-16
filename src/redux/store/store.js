import { configureStore } from "@reduxjs/toolkit";
import comicSlice from "../slice/comicSlice";

export default configureStore({
    reducer: {
        comics: comicSlice.reducer,
    },
})