/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../apis/channelsApi.js';

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
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, action) => {
        const { id } = action.payload;
        state.currentChannelId = id;
      })
      .addMatcher(channelsApi.endpoints.deleteChannel.matchFulfilled, (state, action) => {
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
export default uiSlice.reducer;
