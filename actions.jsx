/* globals Promise:true */
import $ from 'jquery';
import calculateWaterlabel from './lib/calculatewaterlabel.jsx';
import swal from 'sweetalert';
export const CLEAR_SELECTED_OBJECT = 'CLEAR_SELECTED_OBJECT';
export const COMPUTE_LABEL = 'COMPUTE_LABEL';
export const NO_POSTCODE_MATCH = 'NO_POSTCODE_MATCH';
export const RECEIVE_CHOROPLETH = 'RECEIVE_CHOROPLETH';
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY';
export const RECEIVE_POSTCODE = 'RECEIVE_POSTCODE';
export const RECEIVE_RADIUS_SEARCH = 'RECEIVE_RADIUS_SEARCH';
export const REQUEST_CHOROPLETH = 'REQUEST_CHOROPLETH';
export const REQUEST_HISTORY = 'REQUEST_HISTORY';
export const REQUEST_POSTCODE = 'REQUEST_POSTCODE';
export const REQUEST_RADIUS_SEARCH = 'REQUEST_RADIUS_SEARCH';
export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
export const SUBMIT_LABEL_SET_FETCHING = 'SUBMIT_LABEL_SET_FETCHING';
export const SUBMIT_NEW_LABEL = 'SUBMIT_NEW_LABEL';
require('!style!css!./node_modules/sweetalert/dist/sweetalert.css');


// The following makes sure that the XHR POST requests in this file get a
// CRSFToken header with the contents of the crsftoken cookie that's set by
// Django in production. It's doesn't affect the requests in development mode.

function getCookie(cName) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=');
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
}

$.ajaxSetup({
  headers: { 'X-CSRFToken': getCookie('csrftoken') },
});
// End of XHR Header setup


function submitLabelSetFetching() {
  return {
    type: SUBMIT_LABEL_SET_FETCHING,
  };
}

export function submitNewLabel(labelObject) {
  return dispatch => {
    dispatch(submitLabelSetFetching());
    console.log('labelobject', labelObject);
  };
}

export function computeLabel(values) {

  const computed_perceel = Number(values.voortuin) +
    Number(values.achtertuin) +
    Number(values.dak_woning) +
    Number(values.dak_schuur_garage);

  values.perceel = computed_perceel;

  // Constraints
  if (Number(values.berging_dak_schuur) > Number(values.dak_schuur_garage)) {
    values.berging_dak_schuur = Number(values.dak_schuur_garage);
  }
  if (Number(values.berging_dak_woning) > Number(values.dak_woning)) {
    values.berging_dak_woning = Number(values.dak_woning);
  }
  if (Number(values.groene_achtertuin) > Number(values.achtertuin)) {
    values.groene_achtertuin = Number(values.achtertuin);
  }
  if (Number(values.groene_voortuin) > Number(values.voortuin)) {
    values.groene_voortuin = Number(values.voortuin);
  }

  const label = calculateWaterlabel(values);

  return {
    type: COMPUTE_LABEL,
    label,
    calculationvalues: values,
  };
}

export function clearSelectedObject() {
  history.pushState(
    null,
    null,
    '#'
  );
  document.getElementById('postcode').focus();
  return {
    type: CLEAR_SELECTED_OBJECT,
  };
}

export function requestRadiusSearch(obj) {
  return {
    type: REQUEST_RADIUS_SEARCH,
    obj,
  };
}

function receiveRadiusSearch(data) {
  return {
    type: RECEIVE_RADIUS_SEARCH,
    data,
    receivedAt: Date.now(),
  };
}

export function radiusSearch(latlngobj) {
  return dispatch => {
    dispatch(requestRadiusSearch(latlngobj));
    $.ajax({
      url: `/api/v1/mapclick?lat=${latlngobj.lng}&lng=${latlngobj.lat}`,
    }).done((data) => {
      history.pushState(
        null,
        null,
        `#postcode=${data.postcode}&nr=${data.huisnummer}`
      );
      return dispatch(receiveRadiusSearch(data));
    }).error(() => {
      swal(
        'Locatiebepaling mislukt',
        'Helaas, niets gevonden.',
        'error'
      );
      return false;
    });
  };
}

export function setMapLocation(obj) {
  return {
    type: SET_MAP_LOCATION,
    obj,
  };
}

function requestPostcode(postcode, nr) {
  return {
    type: REQUEST_POSTCODE,
    postcode,
    nr,
  };
}

function receivePostcode(data) {
  return {
    type: RECEIVE_POSTCODE,
    data,
    receivedAt: Date.now(),
  };
}

function noPostcodeMatch() {
  return {
    type: NO_POSTCODE_MATCH,
  };
}

export function lookupPostcode(postcode, nr) {
  return dispatch => {
    dispatch(clearSelectedObject());
    dispatch(requestPostcode(postcode, nr));
    $.ajax({
      url: `/api/v1/building/?postalcode=${postcode.toUpperCase()}&housenumber=${nr}`,
    }).done((data) => {
      console.log('data', data);
      if (data.features.length < 1) {
        swal(
          'Postcode/huisnummer niet herkend',
          `Helaas, op de ingevoerde postcode/huisnummer combinatie werd niets
          gevonden.`,
          'error');
        return dispatch(noPostcodeMatch());
      }
      history.pushState(
        null,
        null,
        `#postcode=${postcode}&nr=${nr}`
      );
      return dispatch(receivePostcode(data));
    });
  };
}

function requestHistory() {
  return {
    type: REQUEST_HISTORY,
  };
}

function receiveHistory(data) {
  return {
    type: RECEIVE_HISTORY,
    data,
    receivedAt: Date.now(),
  };
}

export function fetchHistory(id) {
  return dispatch => {
    dispatch(requestHistory());
    const historyEndpoint = $.ajax({
      type: 'GET',
      url: `/api/v1/history?id=${id}`,
      success: (data) => {
        return data;
      },
    });
    Promise.all([historyEndpoint]).then(([historyResults]) => {
      return dispatch(receiveHistory(historyResults));
    });
  };
}


function requestChoropleth() {
  return {
    type: REQUEST_CHOROPLETH,
  };
}

function receiveChoropleth(data) {
  const featureCollection = {
    'type': 'FeatureCollection',
    'features': data[1].map((feature) => {
      return {
        'type': 'Feature',
        'properties': {
          'name': feature.city.name,
          'label_a': feature.city.label_a,
          'label_b': feature.city.label_b,
          'label_c': feature.city.label_c,
          'label_d': feature.city.label_d,
          'label_e': feature.city.label_e,
          'label_f': feature.city.label_f,
          'label_g': feature.city.label_g,
        },
        'geometry': feature.city.geom,
      };
    }),
  };
    // console.log(JSON.stringify(featureCollection));
  return {
    type: RECEIVE_CHOROPLETH,
    data: featureCollection,
    receivedAt: Date.now(),
  };
}

export function fetchChoropleth() {
  return dispatch => {
    dispatch(requestChoropleth());
    const choroplethEndpoint = $.ajax({
      type: 'GET',
      url: '/static_media/nl.json',
      success: (data) => {
        return data;
      },
    });
    Promise.all([choroplethEndpoint]).then(([choroplethResults]) => {
      return dispatch(receiveChoropleth(choroplethResults));
    });
  };
}

function shouldFetchChoropleth(state) {
  if (state.choropleth.length > 0) {
    return false;
  }
  return true;
}

export function fetchChoroplethIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchChoropleth(getState())) {
      return dispatch(fetchChoropleth());
    }
    return Promise.resolve();
  };
}
