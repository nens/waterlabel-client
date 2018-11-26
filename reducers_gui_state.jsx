import {
  GUI_EDIT,
  SELECT_TAB,
} from './actions_gui_state';

export function guiState(state={
  selectedTab: 'dak', // dak tuin terrein
  edit: false,
}, action) {
  switch (action.type) {
    case GUI_EDIT:
      return Object.assign({}, state, {
        edit: action.data,
      });
    case SELECT_TAB:
      return Object.assign({}, state, {
        selectedTab: action.data,
      });
    default:
      return state;
  }
}