import $ from 'jquery';
import swal from 'sweetalert';

export const FETCH_ASSET_TYPES = 'FETCH_ASSET_TYPES';
export const RECEIVE_ASSET_TYPES = 'RECEIVE_ASSET_TYPES';

function setFetching () {
  return {
    type: FETCH_ASSET_TYPES,
  }
}

export function fetchAssetTypes() {
  return dispatch => {
    dispatch(setFetching());
    $.ajax({
      url: "/api/v2/waterlabelassettypes/",
    }).done((data) => {
      return dispatch(receiveAssetTypes(data));
    }).error(() => {
        swal(
          'Geen voorzieningen gevonden op de server',
          'Er is een probleem met de server waardoor het momenteel niet mogelijk is voorzieningen te updaten',
          'error',
        );
      }
    )
  }
}

export function receiveAssetTypes(data) {
  return {
    type: RECEIVE_ASSET_TYPES,
    data: data,
  };
}