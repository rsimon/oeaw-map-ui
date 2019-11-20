import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import MapControls from './Controls/MapControls.jsx';
import MarkerLayer from './MarkerLayer/MarkerLayer.jsx';

const tiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [ 48.184, 16.294 ];
const zoomLevel = 12;

export default class LeafletMap extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPeople == null) // Close popups on deselect
      this._map.closePopup();
  }

  zoomIn() {
    this._map.zoomIn();
  }

  zoomOut() {
    this._map.zoomOut();
  }

  render() {
    return (
      <div>
        <Map
          className='map'
          zoomControl={false}
          ref={c => {this._map = (c ? c.leafletElement : null);}}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={attribution}
            url={tiles} />

          <MarkerLayer
            places={this.props.places}
            selectedPeople={this.props.selectedPeople}
            onSelectPlace={this.props.onSelectPlace} />
        </Map>

        <MapControls
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)}
          onOpenAppInfo={this.props.onOpenAppInfo} />
      </div>
    )
  }

}
