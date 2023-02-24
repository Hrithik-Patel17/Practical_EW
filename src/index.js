import React, { useEffect } from "react";
import { Appearance, BackHandler } from "react-native";
import { Provider } from "react-redux";
import StackNavigator from "./navigators/stackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./stores/reducers";

//persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [
    //reducers that wont be stored
  ],
  whitelist: [
    //reducers that will be stored
    "todo",
  ],
};

const logger = createLogger({
  // ...options
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      console.log(colorScheme);
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });

    // cleanup function
    return () => {
      Appearance.removeChangeListener();
      BackHandler.removeEventListener("hardwareBackPress");
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
