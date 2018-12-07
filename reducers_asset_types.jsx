import {
  FETCH_ASSET_TYPES,
  RECEIVE_ASSET_TYPES,
} from './actions_asset_types'

export function assetTypes(state={
  fetchingState: 'NOT_SEND', // NOT_SEND FETCHING RECEIVED
  assets: [],
}, action) {
  switch (action.type) {
    case FETCH_ASSET_TYPES:
      return Object.assign({}, state, {
        fetchingState: 'FETCHING'
      });
    case RECEIVE_ASSET_TYPES:
      return Object.assign({}, state, {
        fetchingState: 'RECEIVED',
        assets: action.data,
      });
    default:
      return state;
  }
}