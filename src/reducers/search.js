import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const searchState = {
  inputs: {
    data: {},
    status: STATUS.IDLE,
    message: '',
    query: '',
  },
};

export default {
  search: handleActions(
    {
      [ActionTypes.SCP_GET_SEARCH_INPUTS]: (state, { payload }) => {
        const data = state.inputs.data[payload.query] ? state.inputs.data[payload.query] : [];

        return immutable(state, {
          inputs: {
            data: {
              [payload.query]: { $set: data },
            },
            message: { $set: '' },
            query: { $set: payload.query },
            status: { $set: STATUS.RUNNING },
          },
        });
      },
      [ActionTypes.SCP_GET_SEARCH_INPUTS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          inputs: {
            data: {
              [state.inputs.query]: { $set: payload.data || [] },
            },
            status: { $set: STATUS.READY },
          },
        }),
      [ActionTypes.SCP_GET_SEARCH_INPUTS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          inputs: {
            message: { $set: parseError(payload.message) },
            status: { $set: STATUS.ERROR },
          },
        }),
    },
    searchState,
  ),
};
