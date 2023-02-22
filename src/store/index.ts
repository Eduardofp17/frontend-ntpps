import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'FRONTEND-API-REST',
  storage,
  version: 1,
  whitelist: ['authReducer', 'registerReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
