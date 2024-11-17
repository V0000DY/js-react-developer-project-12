/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
};

const uiSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setCurrentChannelName: (state, action) => {
      state.currentChannelName = action.payload;
    },
  },
});

export const { setCurrentChannelId, setCurrentChannelName } = uiSlice.actions;
export default uiSlice.reducer;
