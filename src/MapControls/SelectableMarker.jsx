import React, { Component } from 'react';

import { CircleMarker, Popup } from 'react-leaflet';

export default class SelectableMarker extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  select() {
    this.setState({selected: true});
  }

  deselect() {
    this.setState({selected: false});
  }

  render() {
    return (
      <CircleMarker
        idx={this.props.idx}
        center={this.props.place.location}
        radius={this.state.selected ? 10 : 5}
        color={this.state.selected ? '#a64a40' : '#4a4a4a'}
        opacity={1}
        fillColor={this.state.selected ? '#e75444' : '#545454'}
        fillOpacity={1}
        weight={1.5}
        onClick={this.select.bind(this)}>

        <Popup onClose={this.deselect.bind(this)}>
          <span>{this.props.place.description}</span>
        </Popup>
      </CircleMarker>
    )
  }

}
