import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history.js";
import Main from "../main/main.jsx";
import {notes} from "../../utils/const.js";
import {ActionCreator as ActionCreatorNotes} from "../../reducer/notes/notes.js";
import {getHasInitialNotesSet} from "../../reducer/notes/selectors.js";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    hasInitialNotesSet: getHasInitialNotesSet(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeHasInitialNotesSetFlag: () => dispatch(ActionCreatorNotes.changeHasInitialNotesSetFlag(dispatch)),
  setNotes: (notes) => dispatch(ActionCreatorNotes.setNotes(notes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
