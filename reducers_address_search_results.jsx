import {
  REQUEST_BUILDINGS,
  RECEIVE_BUILDINGS,
  DISMISS_NO_BUILDINGS_FOUND,
  SELECT_ADDRESS_FROM_RESULTS,
  RESET_ADDRESS_QUERY,
  RESET_SELECTED_ADDRESS,
} from './actions_address_search_results';

export function addressSearchResults( state = {
  isFetching: false,
  // hasFetched should be marked true if isFetching returns to false.
  // in case allresults is empty and hasFetched is true -> show popup no results found
  // when dismiss popup hasFatched becomes false again
  hasFetched: false,  
  allResults: [],
  allResultAddresses: [],
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
      // see if there is only one result and if this is the case set it as selected reslult
      // first flatten array from [{houseadresses:[adres1, adres2]}] -> [adres1, adres2]
      const houseAddressArrays = action.data.map(e=>e.houseaddresses);
      const allResultAddresses = [].concat(...houseAddressArrays);
      const selectedResult = allResultAddresses.length===1 ? allResultAddresses[0] : undefined;
      return Object.assign({}, state, {
        allResults: action.data,
        allResultAddresses: allResultAddresses,
        selectedResult: selectedResult,
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
    console.log(SELECT_ADDRESS_FROM_RESULTS);
    return Object.assign({}, state, {
      selectedResult: action.data,
    });
  case RESET_ADDRESS_QUERY:
    console.log('RESET_ADDRESS_QUERY');
    return Object.assign({}, state, {
      selectedResult: false,
      allResults: [],
      allResultAddresses: [],
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
