import undoable, { distinctState } from 'redux-undo';
import { combineReducers } from 'redux';
import centroid from 'turf-centroid';
import geojsonArea from '@mapbox/geojson-area';
import {
  CLEAR_SELECTED_OBJECT,
  COMPUTE_LABEL,
  NO_POSTCODE_MATCH,
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
  case RECEIVE_RADIUS_SEARCH:
    return Object.assign({}, state, {
      label: '?',
      calculationvalues: {},
    });
    break;
  case RECEIVE_POSTCODE:
    return Object.assign({}, state, {
      label: action.data.features[0].properties.labelcode_last,
      calculationvalues: action.data.calculationvalues,
    });
    break;
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
    const radius_center = centroid(action.data.geometry);
    const radius_sqm = geojsonArea.geometry(action.data.geometry);
    return Object.assign({}, state, {
      selectedObject: (action.data) ? action.data : undefined,
      maplocation: {
        lat: radius_center.geometry.coordinates[0],
        lng: radius_center.geometry.coordinates[1],
        zoom: 18,
      },
      sqm: radius_sqm,
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
  case NO_POSTCODE_MATCH:
    return Object.assign({}, state, {
      isFetching: false,
    });
  case RECEIVE_POSTCODE:
    const center = centroid(action.data.features[0].geometry);
    const sqm = geojsonArea.geometry(action.data.features[0].geometry);
    return Object.assign({}, state, {
      isFetching: false,
      selectedObject: action.data.features[0],
      maplocation: {
        lat: center.geometry.coordinates[0],
        lng: center.geometry.coordinates[1],
        zoom: 18,
      },
      sqm,
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
