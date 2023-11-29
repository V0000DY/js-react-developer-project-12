import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 0,
};

const uiSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      // eslint-disable-next-line functional/no-expression-statements, no-param-reassign
      state.currentChannelId = action.payload;
    },
  },
});

export const { actions } = uiSlice;
export const uiSelector = (state) => state.uiReducer.currentChannelId;
export default uiSlice.reducer;
