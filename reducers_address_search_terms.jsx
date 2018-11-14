import {
  SET_POSTCODE_QUERY,
  SET_NUMBER_QUERY,
  SET_STREET_QUERY,
  SET_CITY_QUERY,
} from './actions_asset_types'

export function addressSearchTerms ( state = {
  postcode: '',
  number: '',
  street: '',
  city: '',
}, action) {
  switch (action.type) {
    case SET_POSTCODE_QUERY:
      return Object.assign({}, state, {
        postcode: action.data,
      });
    case SET_NUMBER_QUERY:
      return Object.assign({}, state, {
        number: action.data,
      });
    case SET_STREET_QUERY:
      return Object.assign({}, state, {
        street: action.data,
      });
    case SET_CITY_QUERY:
      return Object.assign({}, state, {
        city: action.data,
      });
    default:
      return state;
  }
}