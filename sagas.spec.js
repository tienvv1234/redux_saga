import test from 'tape'
import { put, call } from 'redux-saga/effects'

import { incrementAsync, deplay } from './saga'

test('incrementAsync Saga test', (assert) => {
    const gen = incrementAsync();

    // incrementAsync is a generator function. When run, it returns an iterator object, and the iterator's next method returns an object with the following shape
    // gen.next() // => { done: boolean, value: any }
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());

    // assert.deepEqual(gen.next(), { done: false, value: ??? }, 'incrementAsync should return a Promise that will resolve after 1 second')
    // console.log('gen.next().value', gen.next.value); //

    assert.deepEqual(gen.next().value, call(deplay, 1000), 'incrementAsync Saga must call delay(1000)');

    // console.log('gen.next().value', gen.next.value); //
    assert.deepEqual(
        gen.next().value,
        put({ type: 'INCREMENT' }),
        'incrementAsync Saga must dispatch an INCREMENT action'
    )

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'incrementAsync Saga must be done'
    )

    assert.end()
})