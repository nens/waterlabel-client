import $ from 'jquery';
import swal from 'sweetalert';

export const FETCH_WATERLABELS = 'FETCH_WATERLABELS';
export const RECEIVE_WATERLABELS = 'RECEIVE_WATERLABELS';
export const SEND_WATERLABEL = 'SEND_WATERLABEL';
export const SERVER_RECEIVED_WATERLABEL = 'SERVER_RECEIVED_WATERLABEL';
export const ADAPT_WATERLABEL = 'ADAPT_WATERLABEL';


function setFetching () {
  return {
    type: FETCH_WATERLABELS,
  }
}

export function requestWaterlabels(bagId) {
  console.log('[f] requestWaterlabels');
  return dispatch => {
    console.log('[f] 2 requestWaterlabels');
    dispatch(setFetching());
    $.ajax({
      url: `/api/v2/waterlabels/?building=${bagId}`,
    }).done(data => {
      return dispatch(receiveWaterlabels(data.results));
    }).error(() => {
        swal(
          'Geen waterlabels gevonden op de server ',
          'Er is een probleem met de server waardoor het momenteel niet mogelijk is waterlabels te zoeken',
          'error',
        );
      }
    )
  }
}
export function receiveWaterlabels(labels) {
  return {
    type: RECEIVE_WATERLABELS,
    data: labels
  }
}

function setSend () {
  return {
    type: SEND_WATERLABEL,
  }
}

export function sendWaterlabel(waterLabel) {
  return dispatch => {
    dispatch(setSend());
    $.ajax({
      url: `/api/v2/waterlabels/?building=${bagId}`,
    }).done(data => {
      return dispatch(receiveWaterlabels(data.results));
    }).error(() => {
        swal(
          'Probleem bij het opslaan van waterlabel',
          'Er is een probleem met de server waardoor het momenteel niet mogelijk is waterlabels op te slaan',
          'error',
        );
      }
    )
  }
}

export function adaptWaterlabel(assets) {
  console.log('[redux action] adaptWaterlabel', assets);
  return {
    type: ADAPT_WATERLABEL,
    data: assets
  }
}

