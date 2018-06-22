import React, { Component } from 'react';

import { LayerGroup } from 'react-leaflet';
import SelectableMarker from './SelectableMarker.jsx';

export default class MarkerLayer extends Component {

  constructor(props) {
    super(props);
    this._markers = [];
    this._selection = [];
  }

  deselectAll() {
    this._selection.forEach(idx => this._markers[idx].deselect());
    this._selection = [];
  }

  beforeSelectMarker(marker) {
    this.deselectAll();
    this._selection = [ this._markers.indexOf(marker) ];
  }

  selectByIndex(indices) {
    this.deselectAll();
    indices.forEach(idx => this._markers[idx].select());
    this._selection = indices;
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
            beforeSelect={this.beforeSelectMarker.bind(this)}/>
        )}
      </LayerGroup>
    )
  }


}
