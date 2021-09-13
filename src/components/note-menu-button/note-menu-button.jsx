import React from "react";
import {connect} from "react-redux";
import {ActionCreator as ActionCreatorInterface} from "../../reducer/interface/interface.js";
import {getNotes, getActiveNote} from "../../reducer/notes/selectors.js";


function NoteMenuButton({changeSidebarState}) {

  const menuButtonClickHandler = () => {
    changeSidebarState();
  }

  return(
    <button className="note-menu-btn" onClick={menuButtonClickHandler} ></button>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: getNotes(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
   changeSidebarState: () => dispatch(ActionCreatorInterface.changeSidebarState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteMenuButton);
