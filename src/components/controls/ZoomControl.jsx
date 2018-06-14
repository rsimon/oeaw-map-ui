import React, { Component } from 'react';

export default class ZoomControl extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="control zoom">
        <button className="plus" onClick={this.props.zoomIn}>+</button>
        <button className="minus" onClick={this.props.zoomOut}>-</button>
      </div>
    )
  }
}
