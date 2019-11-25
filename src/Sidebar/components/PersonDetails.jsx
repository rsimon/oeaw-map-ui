import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

export default class PersonDetails extends Component {

  state = {
    fullscreen: false
  }

  render() {
    const person = this.props.people;
    const imgBg = (person && person.image) ? { backgroundImage: `url("${person.image}")` } : {};

    return (
      <React.Fragment>
        <CSSTransition in={person != null} timeout={300} classNames="slide">
          <div className="persondetails">
            {person &&
              <div>
                <div className="header">
                  <button className="close" onClick={this.props.onClose}>&#xf00d;</button>
                  <div className={person.image ? 'portrait' : 'portrait empty'} onClick={() => this.setState({ fullscreen: true })} style={imgBg}>
                    <div className="gender" data-gender={person.gender}></div>
                  </div>
                  <div className="info">
                    <h1 className="name">{person.name}</h1>
                    <h2>
                      {person.alias && person.alias.map(name =>
                        <span className="alias" key={name}>{name}</span>
                      )}
                      <span className="date">{person.date}</span>
                    </h2>
                  </div>
                </div>
                <div className="body">
                  <p className="description">{person.description}</p>
                </div>
              </div>
            }
          </div>
        </CSSTransition>
        { this.state.fullscreen && 
          <Lightbox
            wrapperClassName="lightbox"
            mainSrc={person.image}
            onCloseRequest={() => this.setState({ fullscreen: false })} />
        }
      </React.Fragment>
    )
  }
}
