import $ from 'jquery';
import swal from 'sweetalert';

export const REQUEST_BUILDINGS = 'REQUEST_BUILDINGS';
export const RECEIVE_BUILDINGS = 'RECEIVE_BUILDINGS';
export const DISMISS_NO_BUILDINGS_FOUND = 'DISMISS_NO_BUILDINGS_FOUND';
export const SELECT_ADDRESS_FROM_RESULTS = 'SELECT_ADDRESS_FROM_RESULTS';
export const RESET_ADDRESS_QUERY = 'RESET_ADDRESS_QUERY';
export const RESET_SELECTED_ADDRESS = 'RESET_SELECTED_ADDRESS';

import {
  // FETCH_WATERLABELS,
  requestWaterlabels,
} from './actions_assets_water_label';

function setFetching () {
  return {
    type: REQUEST_BUILDINGS,
  }
}

export function requestBuildings(postcode, number, street, city) {
  return dispatch => {
    dispatch(setFetching());
    $.ajax({
      url: `/api/v2/buildings/?postalcode=${postcode}&housenumber=${number}&page_size=1000000`,
    }).done(data => {
      return dispatch(receiveBuildings(data.results));
    }).error(() => {
        swal(
          'Geen addressen gevonden op de server ',
          'Er is een probleem met de server waardoor het momenteel niet mogelijk is addressen te zoeken',
          'error',
        );
      }
    )
  }
}
export function receiveBuildings(buildings) {
  return dispatch => {
    const houseAddressArrays = buildings.map(e=>e.houseaddresses);
    const allResultAddresses = [].concat(...houseAddressArrays);
    const selectedResult = allResultAddresses.length===1 ? allResultAddresses[0] : undefined;
    
    if (selectedResult) {
      dispatch(selectAddressFromResults(selectedResult))
    }

    dispatch({
      type: RECEIVE_BUILDINGS,
      data: buildings
    });
  }
  
}
export function dismissNoBuildingsFound() {
  return {
    type: DISMISS_NO_BUILDINGS_FOUND,
  }
}
export function selectAddressFromResults(selection) {
  return dispatch => {
    console.log('selectAddressFromResults');

    // dispatch({
    //   type: FETCH_WATERLABELS,
    //   data: selection.id,
    // });
    dispatch(requestWaterlabels(selection.building));

    dispatch({
      type: SELECT_ADDRESS_FROM_RESULTS,
      data: selection
    });
  }
}
export function resetAddressQuery() {
  return {
    type: RESET_ADDRESS_QUERY,
  }
}
export function resetSelectedAddress() {
  return {
    type: RESET_SELECTED_ADDRESS,
  }
}