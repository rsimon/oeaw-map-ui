import React, { Component } from 'react';

export default class ZoomControl extends Component {

  render() {
    return (
      <div className="control zoom">
        <button className="plus" onClick={this.props.onZoomIn}>+</button>
        <button className="minus" onClick={this.props.onZoomOut}>-</button>
      </div>
    )
  }
  
}
