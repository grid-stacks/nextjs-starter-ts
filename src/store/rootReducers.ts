import { combineReducers, Reducer } from "@reduxjs/toolkit";

import { countReducer, COUNT_SLICE_KEY } from "./count.slice";

// Prepare rootReducer for injecting into enhancer
export default function createReducer(injectedReducers = {}): Reducer {
	const rootReducer = combineReducers({
		[COUNT_SLICE_KEY]: countReducer,
		...injectedReducers,
	});

	return rootReducer;
}
