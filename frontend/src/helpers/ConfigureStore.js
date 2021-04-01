import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './SessionStorage';

const persistedState = loadState();

export function configureStore() {
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(
      thunk,
      logger
    ))
  );
  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
}
