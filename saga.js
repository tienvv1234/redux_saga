import { put, takeEvery, all, call } from 'redux-saga/effects'

export function* helloSaga() {
    console.log('Hello Sagas');
}


export const deplay = (ms) => new Promise(res => setTimeout(res, ms));

export function* incrementAsync() {
    // yield deplay(1000);
    // what's the difference?
    // in the first case, the yield expression deplay(1000) is evaluated before it gets passed to the caller of next
    // (the caller could be the middleware when running our code. it could also be our test code which runs the Generator function and iterates over the return generator)
    // so what the caller gets a Promise, like in the test code above
    // in the second case, the yield expression call(delay, 1000) is what gets passed to the caller of next.
    // call just like put, returns as Effect which instructs the middleware to call a given function with the given arguments,
    // In fact, neither put nor call performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects.
    // put({type: 'INCREMENT'}) // => { PUT: {type: 'INCREMENT'} }
    // call(delay, 1000)        // => { CALL: {fn: delay, args: [1000]}}
    yield call(deplay, 1000);
    yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
    console.log('watchIncrementAsync');
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchIncrementAsync1() {
    console.log('watchIncrementAsync1');
    yield takeEvery('INCREMENT_ASYNC1', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchIncrementAsync1()
    ])
}