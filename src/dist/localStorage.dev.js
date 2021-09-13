"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveState = exports.loadState = void 0;

var loadState = function loadState() {
  try {
    var serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

exports.loadState = loadState;

var saveState = function saveState() {
  try {
    var serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {}
};

exports.saveState = saveState;