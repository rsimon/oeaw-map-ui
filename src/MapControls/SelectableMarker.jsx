import React, { Component } from 'react';

import { CircleMarker, Popup } from 'react-leaflet';

export default class SelectableMarker extends Component {

  componentDidUpdate() {
    // console.log('updated');
  }

  render() {
    return (
      <CircleMarker
        idx={this.props.idx}
        center={this.props.place.location}
        radius={this.props.selected ? 10 : 5}
        color={this.props.selected ? '#a64a40' : '#4a4a4a'}
        opacity={1}
        fillColor={this.props.selected ? '#e75444' : '#545454'}
        fillOpacity={1}
        weight={1.5}
        onClick={this.props.onClick}>

        <Popup>
          <span>{this.props.place.description}</span>
        </Popup>
      </CircleMarker>
    )
  }

}
