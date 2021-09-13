import React, {useEffect, useState, useRef} from "react";
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes";
import {connect} from "react-redux";
import {ActionCreator as ActionCreatorInterface} from "../../reducer/interface/interface";
import {getNotes, getActiveNote} from "../../reducer/notes/selectors.js";
import {MOBILE_BREAKPOINT} from "../../utils/const.js";


function NoteActionList({deleteNote, activeNote, setActiveNote, width, changeSidebarState}) {

  const onCloseButtonClick = () => {
    setActiveNote(null);
  }

  const onDeleteButtonClick = () => {
    deleteNote(activeNote);
  }

  return (
    <section className="action">
      {/* Check width to determine should we display the close button */}
      {width < MOBILE_BREAKPOINT ?
        <button onClick={onCloseButtonClick} className='action__button action__button--close'
          aria-label="Закрыть Заметку"></button>
        : ``}
      <button onClick={onDeleteButtonClick} className='action__button action__button--delete'
        aria-label="Удалить Заметку"></button>
    </section>
  )
}


const mapStateToProps = (state) => {
  return {
    notes: getNotes(state),
    activeNote: getActiveNote(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (note) => dispatch(ActionCreatorNotes.deleteNote(note)),
  setActiveNote: (id) => dispatch(ActionCreatorNotes.setActiveNote(id)),
  changeSidebarState: () => dispatch(ActionCreatorInterface.changeSidebarState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteActionList);

