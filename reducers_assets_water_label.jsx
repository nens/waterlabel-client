import {
  FETCH_WATERLABELS,
  RECEIVE_WATERLABELS,
  SEND_WATERLABEL,
  SERVER_RECEIVED_WATERLABEL,
  ADAPT_WATERLABEL,
  SEND_CALCULATE_TEMP_WATERLABEL,
  RECEIVE_CALCULATE_TEMP_WATERLABEL,
} from './actions_assets_water_label';

export function assetsWaterlabel(state={
  fetchingState: 'NOT_SEND', // NOT_SEND FETCHING RECEIVED
  sendingState: 'NOT SEND', // NOT_SEND SENDING SERVER_RECEIVED
  waterLabelsFromServer: [],
  currentLabel: null,
  calculatedLabel: null,
  computeSendingState: 'NOT SEND', // NOT_SEND SENDING SERVER_RECEIVED
  assetsToAdapt: [],
}, action) {
  switch (action.type) {
    case FETCH_WATERLABELS:
      return Object.assign({}, state, {
        fetchingState: 'FETCHING'
      });
    case RECEIVE_WATERLABELS:
      return Object.assign({}, state, {
        fetchingState: 'RECEIVED',
        waterLabelsFromServer: action.data,
        currentLabel: action.data[0] || null,
        calculatedLabel: action.data[0] || null,
        assetsToAdapt: (action.data[0] && action.data[0].assets) || [],
      });
    case SEND_WATERLABEL:
      return Object.assign({}, state, {
        sendingState: 'SENDING',
      });
    case SERVER_RECEIVED_WATERLABEL:
      return Object.assign({}, state, {
        sendingState: 'SERVER_RECEIVED',
      });
    case ADAPT_WATERLABEL:
      return Object.assign({}, state, {
        assetsToAdapt: action.data,
      });
    case SEND_CALCULATE_TEMP_WATERLABEL:
      return Object.assign({}, state, {
        computeSendingState: 'SENDING',
      });
    case RECEIVE_CALCULATE_TEMP_WATERLABEL:
      return Object.assign({}, state, {
        computeSendingState: 'SERVER_RECEIVED',
        calculatedLabel: action.data,
      });

    default:
      return state;
  }
}