import { createSlice } from '@reduxjs/toolkit';

export const comicSlice = createSlice({
    name: 'comics',
    initialState: {
      comics: [],
    },
    reducers: {
      setLoadCart: (state, action) => {
        state.comics = [...action.comics];
      },
    },
  });

export const {
  setLoadCart,
} = comicSlice.actions

export default comicSlice.reducer;

export const axiosAllProductsByCountries = () => async (dispatch) => {
  try {
    const response = await axios
    dispatch(setLoadCart(response))
    } catch (error) {
      console.log(error);
  }
  
};

