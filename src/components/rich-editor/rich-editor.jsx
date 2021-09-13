import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Editor, EditorState, RichUtils, ContentState, KeyBindingUtil, Modifier, convertToRaw} from "draft-js";
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes.js";
import {useFirstRender} from "../../utils/common.js";
import {getNotes, getActiveNote} from "../../reducer/notes/selectors.js";


function RichEditor({activeNote, setNoteText, notes}) {
  const [editorState, setEditorState] = useState(
    () => activeNote ? EditorState.createWithContent(ContentState.createFromText(notes.find(x => x.id === activeNote.id).text)) : EditorState.createEmpty()
  );
  const firstRender = useFirstRender();

  // Changing editor state on new ActiveNote and setting focus to the end of note
  useEffect(() => {
    if (!firstRender) {
      setEditorState(EditorState.moveFocusToEnd(calcState(activeNote)));
    }
  }, [activeNote]);

  useEffect(() => {
    if (!activeNote) {
      setEditorState(EditorState.createEmpty())
    }
  }, [activeNote]);

  // Saving new note text on every change
  useEffect(() => {
    if (activeNote && !firstRender) {
      const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
      const mappedBlocks = blocks.map(
        block => (!block.text.trim() && "") || block.text
      );

      let newText = "";
      for (let i = 0; i < mappedBlocks.length; i++) {
        const block = mappedBlocks[i];

        // handle last block
        if (i === mappedBlocks.length - 1) {
          newText += block;
        } else {
          // otherwise we join with \n, except if the block is already a \n
          if (block === "\n") newText += block;
          else newText += block + "\n";
        }
      }

      setNoteText({note: activeNote, text: newText});
    }
  }, [editorState.getCurrentContent()]);

  const calcState = (value) => {
    return value
      ? EditorState.createWithContent(ContentState.createFromText(value.text))
      : EditorState.createEmpty();
  }

  const onEditorChange = (editorState) => {
    setEditorState(editorState);
  }

  const handleKeyCommand = (command) => {
    if (command === 'split-block') {
      const newEditorState = RichUtils.insertSoftNewline(editorState);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }

      return 'handled';
    }

    return 'not-handled';
  }

  return (
    <React.Fragment>
      <Editor
        editorState={editorState}
        onChange={onEditorChange}
        handleKeyCommand={handleKeyCommand}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    activeNote: getActiveNote(state),
    notes: getNotes(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  setNoteText: (payload) => dispatch(ActionCreatorNotes.setNoteText(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor);
