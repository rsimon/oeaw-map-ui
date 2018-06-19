import React, { Component } from 'react';

export default class SearchBox extends Component {

  focus() {
    this._input.focus();
  }

  render() {
    return (
      <div className="searchbox">
        <input ref={(c) => this._input = c}type="text" placeholder="Search..."/>
      </div>
    )
  }
}
