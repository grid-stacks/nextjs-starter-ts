import { combineReducers, Reducer } from "@reduxjs/toolkit";

import { countReducer, COUNT_SLICE_KEY } from "./example/count/count.slice";
import { postSlice, POST_SLICE_KEY } from "./example/post/post.slice";

// Prepare rootReducer for injecting into enhancer
export default function createReducer(injectedReducers = {}): Reducer {
	const rootReducer = combineReducers({
		[COUNT_SLICE_KEY]: countReducer,
		[POST_SLICE_KEY]: postSlice.reducer,
		...injectedReducers,
	});

	return rootReducer;
}
