
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

  hide() {
    this.setState({
      visible: false,
      person: undefined
    });
  }

  render() {
    return (
      <CSSTransition in={this.state.visible} timeout={300} classNames="slide">
        <div className="persondetails">
          <div className="header">
            <button className="close" onClick={this.hide.bind(this)}>&#xf00d;</button>
            <div className="portrait">
              <div className="gender" data-gender="m"></div>
            </div>
            <h1 className="name">
              Aleksandar Čokor (22.07.1815 Baja - 1884 Vienna)
            </h1>
            <h2>
              <span className="alias">Alexander Csokor, Александар Чокор</span>
              <span className="date">before 1847-1884</span>
            </h2>
          </div>
          <div className="body">
            <p className="description">
              Aleksandar Čokor came from Baja to Vienna where he worked at the
              North train station (Nordbahnhof) as Officier. Alexandar was born
              on 22 July 1815 in Baja, and he married Anna Schindler on 24
              January 1847 in St Leopold church. Alexander’s adress was
              Leopoldstadt 702. She was born on 22 July 1818.1 Anna died on
              3 July 1856 in house Leopoldstadt 644 in the age of 38 and was
              buried on 5 July on St. Marx cemetery. Alexander's second wife
              Theresia died on 12 March 1859 at the age 25 in the same house
              no 644. She was buried on 14 March on St. Marx cemetery.
            </p>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
