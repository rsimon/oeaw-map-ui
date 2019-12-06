import React, { Component } from 'react';

import { LayerGroup } from 'react-leaflet';
import SelectableMarker from './SelectableMarker.jsx';

export default class MarkerLayer extends Component {

  isPlaceSelected = place => {
    if (this.props.selectedPeople.length == 0)
      return false;

    const selectedPlaces = this.props.selectedPeople.reduce((places, p) => [...places, ...p.places], []);
    return selectedPlaces.includes(place.location_name);
  }

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
