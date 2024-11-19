/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { apiSlice } from './apiSlice';

const defaultChannelId = '1';

const initialState = {
  currentChannelId: defaultChannelId,
};

export const uiSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    setDefaultChannelId: (state) => {
      state.currentChannelId = defaultChannelId;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(apiSlice.endpoints.addChannel.matchFulfilled, (state, action) => {
        const { id } = action.payload;
        state.currentChannelId = id;
      })
      .addMatcher(apiSlice.endpoints.deleteChannel.matchFulfilled, (state, action) => {
        const { id } = action.payload;
        if (state.currentChannelId === id) {
          state.currentChannelId = defaultChannelId;
        }
      });
  },
  selectors: {
    selectCurrentChannelId: (state) => state.currentChannelId,
  },
});

export const { setCurrentChannelId, setDefaultChannelId } = uiSlice.actions;
export const { selectCurrentChannelId } = uiSlice.selectors;
export default uiSlice.reducer;
