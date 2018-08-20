import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import SearchBox from './components/SearchBox.jsx';
import PersonList from './components/PersonList.jsx';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  toggle() {
    if (!this.state.visible) this._searchbox.focus();
    this.setState(previous => ({
      visible: !previous.visible
    }));
  }

  onSearchChange(query) {
    this._personlist.filter(query);
  }

  render() {
    return (
      <CSSTransition in={this.state.visible} timeout={300} classNames="slide">
        <div className="sidebar">
          <div className="content">
            <SearchBox
              ref={c => this._searchbox = c}
              onChange={this.onSearchChange.bind(this)} />

            <PersonList
              people={this.props.people}
              ref={(c) => this._personlist = c}
              onSelectPerson={this.props.onSelectPerson}/>
          </div>
          <div className="tab">
            <button onClick={this.toggle.bind(this)}>&#xf002;</button>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
