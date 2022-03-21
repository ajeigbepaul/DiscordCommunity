import { createSlice } from "@reduxjs/toolkit";
//create the slice here. Simply means the state...
export const appSlice = createSlice({
  //8jIExW7vKcXJRJdmq9b3
  name: "app",
  initialState: {
    channelId: "0",
    channelName: "",
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
