import swal from 'sweetalert';

export const SET_POSTCODE_QUERY = 'SET_POSTCODE_QUERY';
export const SET_NUMBER_QUERY = 'SET_NUMBER_QUERY';
export const SET_STREET_QUERY = 'SET_STREET_QUERY';
export const SET_CITY_QUERY = 'SET_CITY_QUERY';

export function setPostCode (data) {
  return {
    type: SET_POSTCODE_QUERY,
    data: data
  }
}

export function setNumber (data) {
  return {
    type: SET_NUMBER_QUERY,
    data: data
  }
}

export function setStreet (data) {
  return {
    type: SET_STREET_QUERY,
    data: data
  }
}

export function setCity (data) {
  return {
    type: SET_CITY_QUERY,
    data: data
  }
}