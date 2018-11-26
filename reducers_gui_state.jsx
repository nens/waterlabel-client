import {
  GUI_EDIT,
  SELECT_TAB,
  GUI_PRIVACY_TEXT,
  GUI_ABOUT_TEXT,
} from './actions_gui_state';

export function guiState(state={
  selectedTab: 'dak', // dak tuin terrein
  edit: false,
  showPrivacyText: false,
  showAboutText: false,
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
    case GUI_PRIVACY_TEXT:
      return Object.assign({}, state, {
        showPrivacyText: action.data,
      });
    case GUI_ABOUT_TEXT:
      return Object.assign({}, state, {
        showAboutText: action.data,
      });
    default:
      return state;
  }
}