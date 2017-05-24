// @flow
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

/* eslint-disable no-underscore-dangle */
const configureStore = () => {
  const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant(),
      logger
    )
  );
  return createStore(
    rootReducer,
    enhancer
  );
};
/* eslint-enable */

export default configureStore;
