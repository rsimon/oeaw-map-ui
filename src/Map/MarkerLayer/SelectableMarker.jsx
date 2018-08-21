import React, { Component } from 'react';

import { Marker, CircleMarker, Popup } from 'react-leaflet';

const DEFAULT_ICON = new L.Icon.Default
const SELECTED_ICON = L.icon({
  iconUrl: '/public/images/logo-ait.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default class SelectableMarker extends Component {

  render() {
    return (
      <Marker
        position={this.props.place.geom.coordinates.reverse()}
        icon={this.props.selected ? SELECTED_ICON : DEFAULT_ICON}
        onClick={this.props.onClick}>

        <Popup>
          <span>{this.props.place.place}</span>
        </Popup>
      </Marker>
    )
  }

}
