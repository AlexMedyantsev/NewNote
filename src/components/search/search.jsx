import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreator as ActionCreatorSearch} from "../../reducer/search/search.js";
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes.js";
import {getNotes} from "../../reducer/notes/selectors.js";
import {getSearchInput} from "../../reducer/search/selectors.js";


const Search = ({notes, setFilteredNotes, arrayToFilter, searchInput, setSearchInput}) => {

  // Hook that removes filtered notes if there is no value inside search input
  useEffect(() => {
    searchInput.length === 0 ? setFilteredNotes(null) : ``;
  }, [searchInput.length]);

  // Hook that updates filteredNotes when notes or searchInput changes
  useEffect(() => {
    if (searchInput.length > 0) {
      const filteredArray = arrayToFilter.filter((i) => {
        return i.text.toUpperCase().includes(searchInput.toUpperCase());
      })
      setFilteredNotes(filteredArray);
    }

  }, [searchInput, notes])

  let onSearchInputChange = (event) => {
    setSearchInput(event.currentTarget.value);
  }

  let onRemoveButtonClick = () => {
    setSearchInput('');
    setFilteredNotes(null)
  }

  return (
    <div className="search">
      <div className="search__icon search__icon--search"></div>

      {searchInput.length > 0 ?
        <div onClick={onRemoveButtonClick} className="search__icon search__icon--clear"></div> : ``
      }

      <input value={searchInput} onChange={(event) => onSearchInputChange(event)} className="search__input"
        placeholder="Поиск заметок" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchInput: getSearchInput(state),
    notes: getNotes(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  setFilteredNotes: (notes) => dispatch(ActionCreatorNotes.setFilteredNotes(notes)),
  setSearchInput: (input) => dispatch(ActionCreatorSearch.setSearchInput(input)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
