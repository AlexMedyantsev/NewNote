import {extend} from "../../utils/common.js";
import {notes, folders} from "../../utils/const.js";

export const initialState = {
  notes: notes,
  folders: folders,
  hasInitialNotesSet: false,
  filteredNotes: null,
  activeNote: null,
  activeFolder: 'Все Заметки',
  newNoteId: null,
  showMoreNotes: 10,
  notesToShow: 10,
  editorState: null,
};

export const ActionType = {
  SET_NOTES: `SET_NOTES`,
  DELETE_NOTE: `DELETE_NOTE`,
  DELETE_NOTES: `DELETE_NOTES`,
  ADD_FOLDER: `ADD_FOLDER`,
  DELETE_FOLDER: `DELETE_FOLDER`,
  SET_NEW_NOTE_ID: `SET_NEW_NOTE_ID`,
  SET_NOTES_NUMBER_TO_SHOW: `SET_NOTES_NUMBER_TO_SHOW`,
  SET_FILTERED_NOTES: `SET_FILTERED_NOTES`,
  SET_NOTE_TEXT: `SET_NOTE_TEXT`,
  SET_ACTIVE_NOTE: `SET_ACTIVE_NOTE`,
  SET_ACTIVE_FOLDER: `SET_ACTIVE_FOLDER`,
  SET_EDITOR_STATE: `SET_EDITOR_STATE`,
  CHANGE_HAS_INITIAL_NOTES_SET_FLAG: `CHANGE_HAS_INITIAL_NOTES_SET_FLAG`,
}

export const ActionCreator = {
  setNotes: (notes) => ({
    type: ActionType.SET_NOTES,
    payload: notes,
  }),

  deleteNote: (notes) => ({
    type: ActionType.DELETE_NOTE,
    payload: notes,
  }),

  deleteNotes: (notes) => ({
    type: ActionType.DELETE_NOTES,
    payload: notes,
  }),

  addFolder: (notes) => ({
    type: ActionType.ADD_FOLDER,
    payload: notes,
  }),

  deleteFolder: (notes) => ({
    type: ActionType.DELETE_FOLDER,
    payload: notes,
  }),

  setNewNoteId: (id) => ({
    type: ActionType.SET_NEW_NOTE_ID,
    payload: id,
  }),

  setActiveNote: (id) => ({
    type: ActionType.SET_ACTIVE_NOTE,
    payload: id,
  }),

  setActiveFolder: (id) => ({
    type: ActionType.SET_ACTIVE_FOLDER,
    payload: id,
  }),


  setNotesNumberToShow: (number) => ({
    type: ActionType.SET_NOTES_NUMBER_TO_SHOW,
    payload: number,
  }),

  setFilteredNotes: (notes) => ({
    type: ActionType.SET_FILTERED_NOTES,
    payload: notes,
  }),

  setNoteText: ({note, text}) => ({
    type: ActionType.SET_NOTE_TEXT,
    payload: {note: note, text: text},
  }),

  changeHasInitialNotesSetFlag: () => ({
    type: ActionType.CHANGE_HAS_INITIAL_NOTES_SET_FLAG,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_NOTES:
      return extend(state, {notes: [...state.notes, action.payload]});

    case ActionType.DELETE_NOTE:
      const id = action.payload.id
      return extend(state, {
        notes: state.notes.filter((note) => note.id !== id)
      })

    case ActionType.DELETE_NOTES:
      const emptyNotes = action.payload
      return extend(state, {
        notes: state.notes.filter(note => !emptyNotes.includes(note))
      })

    case ActionType.ADD_FOLDER:
      return extend(state, {
        folders: [...state.folders, action.payload]
      })

    case ActionType.DELETE_FOLDER:
      const folderToDelete = action.payload;
      return extend(state, {
        folders: state.folders.filter(folder => folder.name !== folderToDelete)
      })

    case ActionType.SET_NEW_NOTE_ID:
      return extend(state, {newNoteId: action.payload});

    case ActionType.SET_NOTES_NUMBER_TO_SHOW:
      return extend(state, {notesToShow: state.notesToShow + action.payload});

    case ActionType.SET_FILTERED_NOTES:
      return extend(state, {filteredNotes: action.payload})

    case ActionType.SET_ACTIVE_NOTE:
      return extend(state, {
        activeNote: action.payload,
      })

    case ActionType.SET_ACTIVE_FOLDER:
      return extend(state, {
        activeFolder: action.payload,
      })

    case ActionType.CHANGE_HAS_INITIAL_NOTES_SET_FLAG:
      return extend(state, {hasInitialNotesSet: !state.hasInitialNotesSet})

    case ActionType.SET_NOTE_TEXT:
      return extend(state, {
        notes: state.notes.map((note) => {
          if (note.id === action.payload.note.id) {
            return extend(note, {
              text: action.payload.text,
            })
          }
          return note;
        }),
      });
    default:
      return state;
  }
};
