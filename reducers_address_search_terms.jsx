import {
  SET_POSTCODE_QUERY,
  SET_NUMBER_QUERY,
  SET_STREET_QUERY,
  SET_CITY_QUERY,
  SEARCH_ON_STREET,
  SEARCH_ON_POSTCODE,
} from './actions_address_search_terms'

export function addressSearchTerms ( state = {
  postcode: '',
  number: '',
  street: '',
  city: '',
  searchOn: 'POSTCODE', // POSTCODE | STREET
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
    case SEARCH_ON_STREET:
      return Object.assign({}, state, {
        searchOn: 'STREET',
      });
    case SEARCH_ON_POSTCODE:
      return Object.assign({}, state, {
        searchOn: 'POSTCODE',
      });

    default:
      return state;
  }
}