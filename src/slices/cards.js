import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

export const initialState = {
  cardsWidth: checkLocalStorage('cardsWidth', 280),
  cardsHeight: checkLocalStorage('cardsHeight', 500),
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCardsWidth: (state, { payload }) => {
      if (payload === 'inc') {
        state.cardsWidth = state.cardsWidth + 5;
        placeToLocalStorage('cardsWidth', state.cardsWidth + 5);
      }
      else if (payload === 'dec') {
        state.cardsWidth = state.cardsWidth - 5;
        placeToLocalStorage('cardsWidth', state.cardsWidth - 5);
      }
      else {
        state.cardsWidth = 280;
        placeToLocalStorage('cardsWidth', 280);
      }
      
    },
    changeCardsHeight: (state, { payload }) => {
      if (payload === 'inc') {
        state.cardsHeight = state.cardsHeight + 5;
        placeToLocalStorage('cardsHeight', state.cardsHeight + 5);
      }
      else if (payload === 'dec') {
        state.cardsHeight = state.cardsHeight - 5;
        placeToLocalStorage('cardsHeight', state.cardsHeight - 5);
      }
      else {
        state.cardsHeight = 500;
        placeToLocalStorage('cardsHeight', 500);
      }
    },
  }
});

export const { changeCardsWidth, changeCardsHeight } = cardsSlice.actions;

export const cardsSelector = state => state.cards;

export default cardsSlice.reducer;