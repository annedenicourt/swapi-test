import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "results",
  initialState: [] as string[],
  reducers: {
    setFilteredResults: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setFilteredResults } = resultSlice.actions;

export default resultSlice.reducer;
