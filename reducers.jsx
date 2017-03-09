import guid from './lib/guid.jsx';
import undoable, { distinctState } from 'redux-undo';
import { combineReducers } from 'redux';
import {
  CLEAR_SELECTED_OBJECT,
  COMPUTE_LABEL,
  RECEIVE_CHOROPLETH,
  REQUEST_CHOROPLETH,
  RECEIVE_RADIUS_SEARCH,
  REQUEST_RADIUS_SEARCH,
  RECEIVE_POSTCODE,
  REQUEST_POSTCODE,
  RECEIVE_HISTORY,
  REQUEST_HISTORY,
  SET_MAP_LOCATION,
} from './actions.jsx';

function calculator(state = {
  label: undefined,
  calculationvalues: undefined,
}, action) {
  switch (action.type) {
  case CLEAR_SELECTED_OBJECT:
    return Object.assign({}, state, {
      label: undefined,
      calculationvalues: undefined,
    });
  case COMPUTE_LABEL:
    return Object.assign({}, state, {
      label: action.label,
      calculationvalues: action.calculationvalues,
    });
  default:
    return state;
  }
}

function choropleth(state = {
  isFetching: false,
  choropleth: undefined,
}, action) {
  // console.log('reducer indicators() was called with state', state, 'and action', action);
  switch (action.type) {
  case REQUEST_CHOROPLETH:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_CHOROPLETH:
    return Object.assign({}, state, {
      isFetching: false,
      choropleth: action.data,
    });
  default:
    return state;
  }
}

function postcode(state = {
  isFetching: false,
  selectedObject: undefined,
  maplocation: undefined,
  labelHistory: [],
}, action) {
  switch (action.type) {
  case CLEAR_SELECTED_OBJECT:
    return Object.assign({}, state, {
      selectedObject: undefined,
      maplocation: undefined,
      labelHistory: [],
    });
  case REQUEST_RADIUS_SEARCH:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_RADIUS_SEARCH:
    return Object.assign({}, state, {
      selectedObject: (action.data) ? action.data : undefined,
      isFetching: false,
    });
  case SET_MAP_LOCATION:
    return Object.assign({}, state, {
      maplocation: action.obj,
    });
  case REQUEST_HISTORY:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_HISTORY:
    return Object.assign({}, state, {
      isFetching: false,
      labelHistory: action.data,
    });
  case REQUEST_POSTCODE:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_POSTCODE:
    return Object.assign({}, state, {
      isFetching: false,
      selectedObject: action.data,
      maplocation: {
        lat: action.data.lng, // Intentionally flipped!! Comes back flipped from API!
        lng: action.data.lat,
        zoom: action.data.zoom || 18,
      },
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  calculator: undoable(calculator, {
    filter: distinctState(),
    limit: 200,
  }),
  choropleth,
  postcode,
});

export default rootReducer;
