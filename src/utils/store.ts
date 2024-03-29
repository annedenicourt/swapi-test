import { configureStore } from "@reduxjs/toolkit";
import resultSlice from "./reducers/results";

export default configureStore({
  reducer: {
    results: resultSlice,
  },
});
