import {
	createSlice,
	PayloadAction,
	nanoid,
	CaseReducer,
	createAsyncThunk,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";

export const COUNT_SLICE_KEY = "count";

// Interface for todos
export interface ICountTodos {
	uuid?: string;
	text: string;
	completed: boolean;
}

// Interface for count
export interface ICountState {
	loadingStatus: "not loaded" | "loading" | "loaded" | "error";
	error: string | null;
	count: number;
	todos: ICountTodos[];
}

// Dynamic type for case reducers
// T will be replaced with desired type in case of use
export type TCaseReducer<T> = CaseReducer<ICountState, PayloadAction<T>>;

// Count state
export const initialCountState: ICountState = {
	loadingStatus: "not loaded",
	error: null,
	count: 0,
	todos: [],
};

export const fetchTodos = createAsyncThunk(
	`${COUNT_SLICE_KEY}/fetchTodos`,
	async (todo: number, thunkAPI) => {
		console.log(thunkAPI);
		console.log(todo);
		// This return value will be payload for extraReducers
		return todo * 3;
	}
);

// Reducer can be defined outside of slice and added in
const decrementByAmount: TCaseReducer<number> = (state, action) => {
	state.count -= action.payload;
	state.loadingStatus = "loaded";
};

export const countSlice = createSlice({
	name: COUNT_SLICE_KEY,
	initialState: initialCountState,
	reducers: {
		// Incrementing count
		increment: (state) => {
			state.count += 1;
			state.loadingStatus = "loaded";
		},
		// Decrementing count
		decrement: (state) => {
			state.count -= 1;
		},
		// Incrementing count by payload; Payload typed to be a number must;
		incrementByAmount: (state, { payload }: PayloadAction<number>) => {
			state.count += payload;
			state.loadingStatus = "error";
		},
		decrementByAmount,
		// Payload object is extended
		// prepare function receives incoming payload and converts into final payload
		// reducer function works with the final payload
		addTodos: {
			prepare: (text: string) => ({
				payload: { uuid: nanoid(), text, completed: false },
			}),
			reducer(state, { payload }: PayloadAction<ICountTodos>) {
				state.todos.push(payload);
			},
		},
	},
	// In extraReducers action from another slice can be captured
	// And additional actions can be done
	// extraReducers can be write in two ways
	// Builder method and plain method
	extraReducers: (builder) => {
		// Here up on updating user in user slice,
		// count state can be changed
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			console.log(action, state.count);
			return { ...state, ...{ count: state.count + action.payload } };
		});
	},
	// extraReducers: {
	// 	[fetchTodos.fulfilled.type]: (state) => {
	// 		console.log(action);
	// 		return { ...state, ...{ count: action.payload } };
	// 	},
	// },
});

// Exporting reducer
export const countReducer = countSlice.reducer;

// Exporting all actions
export const countActions = countSlice.actions;

// Selecting full state
export const getCountState = (state: RootState): ICountState => {
	return state[COUNT_SLICE_KEY];
};

// Selecting count
export const selectCount = (state: RootState): number =>
	state[COUNT_SLICE_KEY].count;

// Case reducers example
countSlice.caseReducers.incrementByAmount(initialCountState, {
	type: countActions.incrementByAmount.type,
	payload: 80,
});
countSlice.caseReducers.decrementByAmount(initialCountState, {
	type: countActions.decrementByAmount.type,
	payload: 20,
});
// Not working
countActions.incrementByAmount(30);
