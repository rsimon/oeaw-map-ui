import React, { Component } from 'react';

export default class ZoomControl extends Component {

  render() {
    return (
      <div className="control zoom">
        <button className="plus" onClick={this.props.onZoomIn}>&#xf067;</button>
        <button className="minus" onClick={this.props.onZoomOut}>&#xf068;</button>
      </div>
    )
  }

}
