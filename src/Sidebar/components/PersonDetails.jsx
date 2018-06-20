
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class PersonDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      person: undefined
    };
  }

  show(person) {
    this.setState({
      visible: true,
      person: person
    });
  }

  render() {
    return (
      <CSSTransition in={this.state.visible} timeout={300} classNames="slide">
        <div className="persondetails"></div>
      </CSSTransition>
    )
  }
}
