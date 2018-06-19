import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  toggle() {
    this.setState(previous => ({
      visible: !previous.visible
    }));
  }

  render() {
    return (
      <CSSTransition in={this.state.visible} timeout={300} classNames="slide">
        <div className="sidebar">
          <div className="content">
            {/*
            <SearchBox>
              <!-- TODO -->
            </SearchBox>
            <PersonList>
              <!-- TODO -->s
            </PersonList>
            */}
          </div>
          <div className="tab">
            <button onClick={this.toggle.bind(this)}>&#xf002;</button>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
