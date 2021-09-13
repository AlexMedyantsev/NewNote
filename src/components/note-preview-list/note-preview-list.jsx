import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import NotePreviewCard from "../note-preview-card/note-preview-card.jsx";
import {createNote, useFirstRender, usePrevious} from "../../utils/common.js";
import {ActionCreator as ActionCreatorNotes} from '../../reducer/notes/notes.js';
import {getActiveNote, getActiveFolder, getFilteredNotes, getNewNoteId} from "../../reducer/notes/selectors.js";

function NotePreviewList({
  notes,
  filteredNotes,
  activeNote,
  activeFolder,
  setNotes,
  setActiveNote,
  setNewNoteId,
  newNoteId,
  deleteNotes
}) {

  const [noteArrayNumber, setNoteArrayNumber] = useState(notes.indexOf(activeNote))
  const [count, setCount] = useState(notes.length)

  const firstRender = useFirstRender();
  const prevCount = usePrevious(count);

  //Hook that makes a newly created note an active one
  useEffect(() => {
    if (newNoteId && !firstRender) {
      const newNote = notes.find(note => note.id === newNoteId)
      setActiveNote(newNote)
    }
  }, [newNoteId]);

  // Hook that sets the first activeNote on first render
  useEffect(() => {
    if (firstRender && !activeNote) {
      setActiveNote(notes[0]);
    }
  });

  //Hook that deletes empty notes on activeNote change
  useEffect(() => {
    const emptyNotes = notes.filter(note => note.text === '');

    emptyNotes.length > 0 ?
      deleteNotes(emptyNotes) : ``
  }, [activeNote]);

  // This hook is setting up the next closest note index number after any note deleted
  useEffect(() => {
    if (!activeNote) {
      return
    }

    if (activeNote === null) {
      setNoteArrayNumber(0)
    }

    // If there is filtered notes use them to calculate next active filtered note
    if (filteredNotes) {
      const index = filteredNotes.indexOf(activeNote)
      if (index === filteredNotes.length - 1) {
        setNoteArrayNumber(index - 1)
      } else {
        setNoteArrayNumber(index)
      }
      // If there is no filtered notes use unfiltered array of notes
    } else {
      const index = notes.indexOf(activeNote)
      if (index === notes.length - 1) {
        setNoteArrayNumber(index - 1)
      } else {
        setNoteArrayNumber(index)
      }
    }

  }, [activeNote]);

  // This hook updates notes count
  useEffect(() => {
    setCount(notes.length);
  }, [notes.length]);

  //This hook makes adjacent note active after activeNote deleted
  //It fires only when note's count decreases
  useEffect(() => {
    if (!firstRender && notes.length > 0 && prevCount > count) {
      setActiveNote(notes[noteArrayNumber])
    }
  }, [count]);

  return (
    <React.Fragment>
      {
        notes.length === 0 ?
          <div className="notes__empty-cnt">
            <span className="notes__empty-text">Нет заметок</span>
            <button
              onClick={() => createNote(setNotes, setNewNoteId, activeFolder)}
              className="notes__create-note">
              Создать заметку
            </button>
          </div>
          :
          <ul className={`notes__list`}>
            {notes ? filteredNotes ? filteredNotes.map(note =>
              <NotePreviewCard
                note={note}
                key={note.id}
                activeNote={activeNote}
              />
            ) : notes.map(note =>
              <NotePreviewCard
                note={note}
                key={note.id}
                activeNote={activeNote}
              />
            ) : ``}
          </ul>
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    activeNote: getActiveNote(state),
    activeFolder: getActiveFolder(state),
    filteredNotes: getFilteredNotes(state),
    newNoteId: getNewNoteId(state),
  }
}
  ;

const mapDispatchToProps = (dispatch) => (
  {
    setNotesNumberToShow: (number) => dispatch(ActionCreatorNotes.setNotesNumberToShow(number)),
    setNotes: (notes) => dispatch(ActionCreatorNotes.setNotes(notes)),
    setNewNoteId: (note) => dispatch(ActionCreatorNotes.setNewNoteId(note)),
    setActiveNote: (note) => dispatch(ActionCreatorNotes.setActiveNote(note)),
    deleteNotes: (notes) => dispatch(ActionCreatorNotes.deleteNotes(notes)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NotePreviewList);
