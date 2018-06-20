import React, { Component } from 'react';

export default class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  show() {
    this.setState({visible: true});
  }

  hide() {
    this.setState({visible: false});
  }

  onClick(e) {
    // If this is a click on the clicktrap (not the modal!), close
    if (e.target.className.startsWith('clicktrap'))
      this.hide();
  }

  render() {
    return (
      <div
        className={this.state.visible ? `clicktrap ${this.props.className}` : `clicktrap ${this.props.className} hidden`}
        onClick={this.onClick.bind(this)}>

        <div className="modal">
          <button className="exit" onClick={this.hide.bind(this)}>&#xf00d;</button>
          <div className="body">
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}
