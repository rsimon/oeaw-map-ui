import React, { Component } from 'react';

export default class Modal extends Component {

  onClick(e) {
    // If this is a click on the clicktrap (not the modal!), close
    if (e.target.className.startsWith('clicktrap'))
      this.props.onClose();
  }

  render() {
    return (
      <div
        className={`clicktrap ${this.props.className}`}
        onClick={this.onClick.bind(this)}>

        <div className="modal">
          <button className="exit" onClick={this.props.onClose}>&#xf00d;</button>
          <div className="body">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
