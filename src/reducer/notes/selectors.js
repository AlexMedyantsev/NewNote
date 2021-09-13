import NameSpace from './../name-space.js';

export const getNotes = (state) => state[NameSpace.NOTES].notes;
export const getFolders = (state) => state[NameSpace.NOTES].folders;
export const getHasInitialNotesSet = (state) => state[NameSpace.NOTES].hasInitialNotesSet;
export const getFilteredNotes = (state) => state[NameSpace.NOTES].filteredNotes;
export const getActiveNote = (state) => state[NameSpace.NOTES].activeNote;
export const getActiveFolder = (state) => state[NameSpace.NOTES].activeFolder;
export const getNewNoteId = (state) => state[NameSpace.NOTES].newNoteId;
export const getShowMoreNotes = (state) => state[NameSpace.NOTES].showMoreNotes;
export const getEditorState = (state) => state[NameSpace.NOTES].editorState;
