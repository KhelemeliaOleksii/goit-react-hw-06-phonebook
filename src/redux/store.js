import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const ignoreActionsReduxToolKit = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger);
        return ignoreActionsReduxToolKit;

    },
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistedStore = {
    store,
    persistor: persistStore(store),
}