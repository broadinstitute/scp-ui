// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { scpGetSearchInputs: getSearchInputs } = createActions({
  [ActionTypes.SCP_GET_SEARCH_INPUTS]: (query: string) => ({ query }),
});
