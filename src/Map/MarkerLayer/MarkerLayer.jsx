import React, { Component } from 'react';

import { LayerGroup } from 'react-leaflet';
import SelectableMarker from './SelectableMarker.jsx';

export default class MarkerLayer extends Component {

  isPlaceSelected(place) {
    if (this.props.selectedPerson)
      return place.person == this.props.selectedPerson.name;
    else
      return false; // No selected person - deselect all
  }

  render() {
    return(
      <LayerGroup>
        {this.props.places.map((place, idx) =>
          <SelectableMarker
            key={`marker-${idx}`}
            place={place}
            disabled={this.props.selectedPerson}
            selected={this.isPlaceSelected(place)}
            onClick={this.props.onSelectPlace.bind(this, place)} />
        )}
      </LayerGroup>
    )
  }

}
