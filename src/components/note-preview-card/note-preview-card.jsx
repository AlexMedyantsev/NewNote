import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator as ActionCreatorNotes} from '../../reducer/notes/notes.js';
import {MAX_PREVIEW_LINE_LENGTH} from '../../utils/const'
import {getActiveNote} from "../../reducer/notes/selectors.js";


function NotePreviewCard({note, key, setActiveNote, activeNote}) {

  const onNoteItemClick = (note) => {
    setActiveNote(note);
  }

  const getFirstLineFromString = (string) => {
    let newString = string;

    if (newString && newString.length > MAX_PREVIEW_LINE_LENGTH) {
      return newString.slice(0, newString.indexOf('\n'))
      // return newString.substring(0, MAX_PREVIEW_LINE_LENGTH) + '...';
    }

    return newString;
  }

  return (
    <li
      className={activeNote ? note.id === activeNote.id ? 'notes__item notes__item--active' : 'notes__item' : 'notes__item'}
      onClick={() => onNoteItemClick(note)}
      key={key}
    >
      <h3 className="notes__name">{getFirstLineFromString(note.text)}</h3>
    </li >
  )
}

const mapStateToProps = (state) => {
  return {
    activeNote: getActiveNote(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  setActiveNote: (note) => dispatch(ActionCreatorNotes.setActiveNote(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotePreviewCard);
