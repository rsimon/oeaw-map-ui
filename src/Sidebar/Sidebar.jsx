import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import SearchBox from './components/SearchBox.jsx';
import PersonList from './components/PersonList.jsx';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible  : false,
      people   : this.props.people
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.people != this.props.people)
      this.setState({ people: nextProps.people });
  }

  toggle() {
    this.setState(previous => ({
      visible: !previous.visible
    }));
  }

  onSearchChanged(query) {
    const filtered = this.props.people.filter(p => {
      return p.name.toLowerCase().startsWith(query.toLowerCase());
    });

    this.props.onSelectPerson(null);
    this.setState({ people: filtered });
  }

  render() {
    return (
      <CSSTransition in={this.state.visible} timeout={300} classNames="slide">
        <div className="sidebar">
          <div className="content">
            <SearchBox
              visible={this.state.visible}
              onChange={this.onSearchChanged.bind(this)} />

            <PersonList
              people={this.state.people}
              selected={this.props.selectedPerson}
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
