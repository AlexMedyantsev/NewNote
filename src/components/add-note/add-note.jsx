import React from 'react';
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes";
import {connect} from "react-redux";
import {createNote} from "../../utils/common.js"
import {} from "../../reducer/notes/selectors.js";

function AddNote({setNotes, setNewNoteId, activeFolder}) {
  return (
    <div
      onClick={() => createNote(setNotes, setNewNoteId, activeFolder)}
      className="button button--add"
    >

    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
  setNotes: (newNote) => dispatch(ActionCreatorNotes.setNotes(newNote)),
  setNewNoteId: (id) => dispatch(ActionCreatorNotes.setNewNoteId(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)
