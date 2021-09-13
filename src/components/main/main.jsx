import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {throttle} from 'lodash';
import _debounce from 'lodash.debounce'
import NotePreviewList from "../note-preview-list/note-preview-list.jsx";
import RichEditor from "../rich-editor/rich-editor.jsx";
import NoteActionList from "../note-action-list/note-action-list.jsx";
import Search from "../search/search.jsx";
import AddNote from "../add-note/add-note.jsx";
import NoteMenuButton from "../note-menu-button/note-menu-button.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import {getNotes, getActiveNote, getActiveFolder} from "../../reducer/notes/selectors.js";


function Main({notes, activeNote, activeFolder, isSidebarOpen}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [filteredByFolderNotes, setFilteredByFolderNotes] = useState(notes)

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  useEffect(() => {
    const handleResize = _debounce(() => setWidth(window.innerWidth), 100)

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // Хук Фильтрует заметки по активной папке
  useEffect(() => {
    setFilteredByFolderNotes(notes.filter(note => note.inFolders.includes(activeFolder)))
  }, [activeFolder, notes]);

  return (
    <div className="container__main" style={{"maxHeight": height, height: height}}>
      <Sidebar />

      {/* Левый главный контейнер */}
      <section className={`container__left ${activeNote ? `container__left--hidden` : ``}`}>
        <div className='container__left--top container__top'>
          <div className="wrapper">
            <NoteMenuButton />
            <h1 className="folder-title">{activeFolder}</h1>
          </div>
          <AddNote
            activeFolder={activeFolder}
          />
        </div>

        <div className={notes.length === 0 ?
          'container__left--bottom container__empty container__bottom' :
          'container__left--bottom container__with-content container__bottom'}
          style={{"maxHeight": height - 50}}
        >
          <Search arrayToFilter={filteredByFolderNotes} />
          <NotePreviewList
            notes={filteredByFolderNotes}
          />

        </div>
      </section>

      {/* Правый главный контейнер */}
      <section className={`container__right ${!activeNote ? `container__right--hidden` : ``}`}>
        <div className='container__right--top container__top'>
          <NoteActionList width={width} />
        </div>
        <div className='container__right--bottom container__bottom'>
          <RichEditor />
        </div>
      </section>
      <span style={{display: 'none'}}>{width}</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: getNotes(state),
    activeNote: getActiveNote(state),
    activeFolder: getActiveFolder(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  // resetActiveCard: () => dispatch(ActionCreatorCondition.resetActiveCard(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
