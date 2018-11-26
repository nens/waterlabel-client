// import $ from 'jquery';
// import swal from 'sweetalert';

export const GUI_EDIT = 'GUI_EDIT';
export const SELECT_TAB = 'SELECT_TAB';


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

