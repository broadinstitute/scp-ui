/**
 * @module Sagas/Search
 * @desc Search
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get SCP search inputs
 *
 * @param {Object} action
 *
 */
export function* getScpSearchInputs({ payload }) {
  try {
    const response = yield {
      items: [
        {
          name: 'foo',
          description: 'test1',
          owner: { login: 'fooOwner' },
          html_url: 'https://foo.com',
        },
        {
          name: 'bar',
          description: 'test2',
          owner: { login: 'barOwner' },
          html_url: 'https://bar.com',
        },
        {
          name: 'baz',
          description: 'test3',
          owner: { login: 'bazOwner' },
          html_url: 'https://baz.com',
        },
      ],
    };
    // yield call(
    //   request,
    //   `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`,
    // );
    yield put({
      type: ActionTypes.SCP_GET_SEARCH_INPUTS_SUCCESS,
      payload: { data: response.items },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SCP_GET_SEARCH_INPUTS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Search Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.SCP_GET_SEARCH_INPUTS, getScpSearchInputs)]);
}
