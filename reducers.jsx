import undoable, { distinctState } from 'redux-undo';
import { combineReducers } from 'redux';
import centroid from 'turf-centroid';
import geojsonArea from '@mapbox/geojson-area';
import {assetTypes} from './reducers_asset_types';
import {addressSearchTerms} from './reducers_address_search_terms'
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

  SET_POSTCODE_QUERY,
  SET_NUMBER_QUERY,
  SET_STREET_QUERY,
  SET_CITY_QUERY,

  REQUEST_BUILDINGS,
  RECEIVE_BUILDINGS,
  DISMISS_NO_BUILDINGS_FOUND,
  SELECT_ADDRESS_FROM_RESULTS,
  RESET_ADDRESS_QUERY,
  RESET_SELECTED_ADDRESS,
} from './actions.jsx';

import {
  FETCH_ASSET_TYPES,
  RECEIVE_ASSET_TYPES,
} from './actions_asset_types.jsx'

function calculator(state = {
  label: undefined,
  calculationvalues: undefined,
}, action) {
  switch (action.type) {
  case RECEIVE_RADIUS_SEARCH:
    return Object.assign({}, state, {
      label: action.data.properties.labelcode_last,
      calculationvalues: action.calculationvalues,
    });
  case RECEIVE_POSTCODE:
    return Object.assign({}, state, {
      label: action.data.features[0].properties.labelcode_last,
      calculationvalues: action.data.calculationvalues,
    });
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



function addressSearchResults( state = {
    isFetching: false,
    // hasFetched should be marked true if isFetching returns to false.
    // in case allresults is empty and hasFetched is true -> show popup no results found
    // when dismiss popup hasFatched becomes false again
    hasFetched: false,  
    allResults: [],
    selectedResult: null,
  }, action) {
  switch (action.type) {
    case REQUEST_BUILDINGS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_BUILDINGS:
      // only update state if it was actually fetching.
      // this might not be the case if the user used the back button after a fetch
      if (state.isFetching) {
        return Object.assign({}, state, {
          allResults: action.data,
          isFetching: false,
          hasFetched: true,
        });
      } 
      else {
        return state;
      }
     
    case DISMISS_NO_BUILDINGS_FOUND:
      return Object.assign({}, state, {
        hasFetched: false,
      });
    case SELECT_ADDRESS_FROM_RESULTS:
      return Object.assign({}, state, {
        selectedResult: action.data,
      });
    case RESET_ADDRESS_QUERY:
      return Object.assign({}, state, {
        allResults: [],
        isFetching: false,
        hasFetched: false,
      });
    case RESET_SELECTED_ADDRESS:
      return Object.assign({}, state, {
        selectedResult: null,
      });
      
    default:
      return state;
  }
}



function postcode(state = {
  isFetching: false,
  foundObjects: undefined,
  selectedObject: undefined,
  maplocation: undefined,
  labelHistory: [],
}, action) {
  switch (action.type) {
  case CLEAR_SELECTED_OBJECT:
    return Object.assign({}, state, {
      selectedObject: undefined,
      foundObjects: undefined,
      maplocation: undefined,
      labelHistory: [],
    });
  case REQUEST_RADIUS_SEARCH:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case RECEIVE_RADIUS_SEARCH:
    const radius_center = centroid(action.data.geometry);
    const radius_sqm = Math.round(geojsonArea.geometry(action.data.geometry));
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
    const sqm = Math.round(geojsonArea.geometry(action.data.features[0].geometry));
    const houseAddresses = []
    return Object.assign({}, state, {
      isFetching: false,
      foundObjects: action.results,
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
  assetTypes,
  addressSearchTerms,
});

export default rootReducer;
