import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
	configureStore,
	getDefaultMiddleware,
	Action,
	Store,
	applyMiddleware,
	EnhancedStore,
	ThunkAction,
} from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";

import createReducer from "./rootReducers";

export function configureAppStore(initialState = {}): EnhancedStore {
	// Logger configuration
	const logger = createLogger({
		collapsed: true,
		duration: true,
	});

	// Saga setup
	const reduxSagaMonitorOptions = {};
	const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
	const { run: runSaga } = sagaMiddleware;

	const middleware = [
		...getDefaultMiddleware(),
		logger,
		sagaMiddleware, // Saga middleware injection
	];

	const enhancers = [
		applyMiddleware(...middleware),
		createInjectorsEnhancer({
			createReducer,
			runSaga,
		}),
	];

	const store: Store = configureStore({
		reducer: createReducer(),
		preloadedState: initialState,
		devTools: process.env.NODE_ENV !== "production",
		enhancers,
	});

	return store;
}

const getStore = configureAppStore();
export const rootReducers = createReducer();

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof getStore.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default getStore;

export function useStore(initialState: RootState = {}) {
	const store = useMemo(() => configureAppStore(initialState), [
		initialState,
	]);
	return store;
}
