import React, { Component } from 'react';

import { LayerGroup } from 'react-leaflet';
import SelectableMarker from './SelectableMarker.jsx';

export default class MarkerLayer extends Component {

  constructor(props) {
    super(props);
    this._markers = [];
  }

  render() {
    return(
      <LayerGroup>
        {this.props.places.map((place, idx) =>
          <SelectableMarker
            key={`marker-${idx}`}
            ref={m => this._markers[idx] = m}
            idx={idx}
            place={place}
            selected={place.selected}
            onClick={this.props.onSelectMarker} />
        )}
      </LayerGroup>
    )
  }


}
