/**
 * @module Sagas/App
 * @desc App
 */
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

/**
 * Switch Menu
 *
 * @param {Object} action
 *
 */
export function* switchMenu({ payload }) {
  try {
    const repos = yield select(state => state.search.inputs);

    /* istanbul ignore else */
    if (!repos.data[payload.query] || !repos.data[payload.query].length) {
      yield put({
        type: ActionTypes.SCP_GET_SEARCH_INPUTS,
        payload,
      });
    }
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.EXCEPTION,
      payload: err,
    });
  }
}

/**
 * App Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.SWITCH_MENU, switchMenu)]);
}
