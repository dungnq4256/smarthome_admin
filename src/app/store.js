// Import reducers
import authReducer from "./authSlice";
import homeReducer from "./homeSlice";
import deviceReducer from "./deviceSlice";

const {
  configureStore
} = require("@reduxjs/toolkit");

// root reducer
const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  device: deviceReducer,
};

// app store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_DEV_TOOLS == 1 ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
