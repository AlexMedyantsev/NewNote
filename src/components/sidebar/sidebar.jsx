import React, {useEffect, useState} from 'react';
import {ActionCreator as ActionCreatorInterface} from "../../reducer/interface/interface.js";
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes.js";
import {connect} from "react-redux";
import FolderItem from '../folder-item/folder-item.js';
import {getNotes, getActiveFolder, getFolders} from "../../reducer/notes/selectors.js";
import {getIsSidebarOpen} from "../../reducer/interface/selectors.js";


function Sidebar({
  changeSidebarState,
  isSidebarOpen,
  addFolder,
  activeFolder,
  deleteFolder,
  setActiveFolder,
  setActiveNote,
  folders,
  notes
}) {
  const [sidebarUIState, changeSidebarUIState] = useState({
    isNewFolderCreationMode: false,
    isFolderDeleteMode: false,
  })

  const overlayClickHandler = () => {
    changeSidebarState()
  }

  const closeSidebarOnKeydown = (event) => {
    if (event.keyCode === 27) {
      changeSidebarState()
    }
  }

  let addFolderButtonClickHandler = (event) => {
    event.stopPropagation()
    changeSidebarUIState({...sidebarUIState, isNewFolderCreationMode: true})
  }

  let setDeleteFolderModeButtonClickHandler = (event) => {
    event.stopPropagation()
    changeSidebarUIState({...sidebarUIState, isFolderDeleteMode: !sidebarUIState.isFolderDeleteMode})
  }

  let onBlurHandler = (e) => {
    if (!e.target.value <= 0) {
      addFolder({name: e.target.value, canBeDeleted: true})
      changeSidebarUIState({...sidebarUIState, isNewFolderCreationMode: false})
    }
    changeSidebarUIState({...sidebarUIState, isNewFolderCreationMode: false})
  }

  let onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value <= 0) {
        addFolder({name: e.target.value, canBeDeleted: true})
        changeSidebarUIState({...sidebarUIState, isNewFolderCreationMode: false})

      }
      changeSidebarUIState({...sidebarUIState, isNewFolderCreationMode: false})
    }
  }

  let deleteFolderButtonClickHandler = (folderName, e) => {
    e.stopPropagation();
    deleteFolder(folderName)
    setActiveFolder('Все Заметки')
    setActiveNote(notes[0])
  }

  let folderClickHandler = (folderName) => {
    setActiveFolder(folderName)
    setActiveNote(null)
    changeSidebarState()
  }

  return (
    <div onClick={overlayClickHandler} onKeyDown={(event) => closeSidebarOnKeydown()} className={isSidebarOpen ? 'overlay' : 'hidden'}>
      <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar__top">
          <h1>Папки</h1>
          <div className="wrapper">
            <div
              className={sidebarUIState.isFolderDeleteMode ?
                "button button--remove--active" : "button button--remove"
              }
              onClick={setDeleteFolderModeButtonClickHandler}
            ></div>
            <div
              className="button button--add"
              onClick={addFolderButtonClickHandler}
            ></div>
          </div>

        </div>
        <ul className="sidebar__folder-list">
          {folders && folders.map((folder) => {

            let noteCount = notes.filter(note => note.inFolders.includes(folder.name)).length
            return <FolderItem
              activeFolder={activeFolder}
              canBeDeleted={folder.canBeDeleted}
              isDeleteMode={sidebarUIState.isFolderDeleteMode}
              folderName={folder.name}
              count={noteCount}
              addCallback={addFolder}
              folderClickHandler={folderClickHandler}
              deleteCallback={deleteFolderButtonClickHandler}
            />

          })}
          {sidebarUIState.isNewFolderCreationMode &&
            <div className="sidebar__folder-item">
              <input
                autoFocus
                minlength="1"
                maxlength='15'
                type="text"
                className="sidebar__folder-input"
                onBlur={onBlurHandler}
                placeholder='назовите папку'
                onKeyDown={onKeyDownHandler}
              >
              </input>
            </div>
          }

        </ul>
      </aside>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    notes: getNotes(state),
    isSidebarOpen: getIsSidebarOpen(state),
    activeFolder: getActiveFolder(state),
    folders: getFolders(state)
  }
};

const mapDispatchToProps = (dispatch) => (
  {
    changeSidebarState: () => dispatch(ActionCreatorInterface.changeSidebarState()),
    addFolder: (name) => dispatch(ActionCreatorNotes.addFolder(name)),
    deleteFolder: (name) => dispatch(ActionCreatorNotes.deleteFolder(name)),
    setActiveFolder: (name) => dispatch(ActionCreatorNotes.setActiveFolder(name)),
    setActiveNote: (name) => dispatch(ActionCreatorNotes.setActiveNote(name)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
