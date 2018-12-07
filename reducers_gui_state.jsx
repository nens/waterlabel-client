import {
  GUI_EDIT,
  GUI_OTHER_LABELS,
  SELECT_TAB,
  GUI_PRIVACY_TEXT,
  GUI_ABOUT_TEXT,
  GUI_OPEN_DETAILS,
  GUI_CLOSE_DETAILS,
} from './actions_gui_state';

export function guiState(state={
  selectedTab: 'dak', // dak tuin terrein
  showOtherLabels: false,
  edit: false,
  showPrivacyText: false,
  showAboutText: false,
  showDetails: false,
}, action) {
  switch (action.type) {
    case GUI_EDIT:
      return Object.assign({}, state, {
        edit: action.data,
      });
    case GUI_OTHER_LABELS:
      return Object.assign({}, state, {
        showOtherLabels: action.data,
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
    case GUI_OPEN_DETAILS:
      return Object.assign({}, state, {
        showDetails: true,
      });
    case GUI_CLOSE_DETAILS:
      return Object.assign({}, state, {
        showDetails: false,
      });
    default:
      return state;
  }
}