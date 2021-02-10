import { put, takeEvery, all } from "redux-saga/effects";
import { countActions } from "./count.slice";

export const delay = (ms: number): Promise<unknown> =>
	new Promise((res) => setTimeout(res, ms));

export function* incrementAsync(): Generator {
	yield delay(3000);
	yield put({ type: countActions.incrementByAmount.type, payload: 3 });
}

export function* decrementAsync(): Generator {
	yield delay(1000);
	yield put({
		type: countActions.incrementByAmount.type,
		payload: -10,
	});
}

// Watcher saga will be called from component by useInjectSaga
// where it requires
export function* watchIncrementAsync(): Generator {
	yield takeEvery([countActions.increment], incrementAsync);
}

export function* watchDecrementAsync(): Generator {
	yield takeEvery([countActions.decrement], decrementAsync);
}

// Multiple sagas can be called together from a component
export function* countComponentSaga(): Generator {
	yield all([watchIncrementAsync(), watchDecrementAsync()]);
}
