import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import MapControls from './Controls/MapControls.jsx';
import MarkerLayer from './MarkerLayer/MarkerLayer.jsx';

const tiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [ 48.1638, 16.9528 ];
const zoomLevel = 8;

export default class LeafletMap extends Component {

  zoomIn() {
    const map = this._leafletMap.leafletElement;
    map.zoomIn();
  }

  zoomOut() {
    const map = this._leafletMap.leafletElement;
    map.zoomOut();
  }

  selectByIndex(indices) {
    const map = this._leafletMap.leafletElement;
    map.closePopup();
    this._markers.selectByIndex(indices);
  }

  render() {
    return (
      <div>
        <Map
          className='map'
          zoomControl={false}
          ref={c => {this._leafletMap = c;}}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={attribution}
            url={tiles} />

          <MarkerLayer
            ref={c => this._markers = c}
            places={this.props.places}
            onSelectPlace={this.props.onSelectPlace.bind(this)} />
        </Map>

        <MapControls
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)}
          onOpenAppInfo={this.props.onOpenAppInfo} />
      </div>
    )
  }

}
