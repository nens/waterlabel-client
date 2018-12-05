// import $ from 'jquery';
// import swal from 'sweetalert';

export const GUI_EDIT = 'GUI_EDIT';
export const SELECT_TAB = 'SELECT_TAB';
export const GUI_PRIVACY_TEXT = 'GUI_PRIVACY_TEXT';
export const GUI_ABOUT_TEXT = 'GUI_ABOUT_TEXT';  


export function setGuiEdit (statusTrueFalse) {
  return {
    type: GUI_EDIT,
    data: statusTrueFalse
  }
}

export function setTab (tab) {
  return {
    type: SELECT_TAB,
    data: tab
  }
}

export function setPrivacy (privacyTrueFalse) {
  return {
    type: GUI_PRIVACY_TEXT,
    data: privacyTrueFalse
  }
}

export function setAbout (aboutTrueFalse) {
  return {
    type: GUI_ABOUT_TEXT,
    data: aboutTrueFalse
  }
}

