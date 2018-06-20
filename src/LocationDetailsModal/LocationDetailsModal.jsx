import React, { Component } from 'react';

export default class LocationDetailsModal extends Component {

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

  render() {
    return (
      <div className={this.props.visible ? 'modal locationdetails' : 'modal locationdetails hidden'}>
        <button className="exit" onClick={this.hide.bind(this)}>&#xf00d;</button>
      </div>
    )
  }
}
