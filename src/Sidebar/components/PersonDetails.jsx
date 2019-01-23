import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class PersonDetails extends Component {

  render() {
    return (
      <CSSTransition in={this.props.person != null} timeout={300} classNames="slide">
        <div className="persondetails">
          {this.props.person &&
            <div>
              <div className="header">
                <button className="close" onClick={this.props.onClose}>&#xf00d;</button>
                <div className="portrait" style={{
                  backgroundImage: `url("${this.props.person.image}")`
                }}>
                  <div className="gender" data-gender={this.props.person.gender}></div>
                </div>
                <div className="info">
                  <h1 className="name">{this.props.person.name}</h1>
                  <h2>
                    {this.props.person.alias && this.props.person.alias.map(name =>
                      <span className="alias" key={name}>{name}</span>
                    )}
                    <span className="date">{this.props.person.date}</span>
                  </h2>
                </div>
              </div>
              <div className="body">
                <p className="description">{this.props.person.description}</p>
              </div>
            </div>
          }
        </div>
      </CSSTransition>
    )
  }
}
