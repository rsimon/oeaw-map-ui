import React, { Component } from 'react';

import { LayerGroup } from 'react-leaflet';
import SelectableMarker from './SelectableMarker.jsx';

export default class MarkerLayer extends Component {

  isPlaceSelected = place => (this.props.selectedPeople.length > 0) ? 
    this.props.selectedPeople.includes(place.id) :  false;

  render() {
    return(
      <LayerGroup>
        {this.props.places.map((place, idx) =>
          <SelectableMarker
            key={`marker-${idx}`}
            place={place}
            disabled={this.props.selectedPeople.length > 0}
            selected={this.isPlaceSelected(place)}
            onClick={this.props.onSelectPlace.bind(this, place)} />
        )}
      </LayerGroup>
    )
  }

}
