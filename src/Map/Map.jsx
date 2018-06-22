import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import MapControls from './Controls/MapControls.jsx';
import MarkerLayer from './MarkerLayer/MarkerLayer.jsx';

const tiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const attribution = 'Map tiles: <a href="http://dare.ht.lu.se/">DARE 2018</a>';
const mapCenter = [ 48.1638, 16.9528 ];
const zoomLevel = 8;

export default class LeafletMap extends Component {

  onSelectMarker(event) {

  }

  zoomIn() {
    const map = this._leafletMap.leafletElement;
    map.zoomIn();
  }

  zoomOut() {
    const map = this._leafletMap.leafletElement;
    map.zoomOut();
  }

  render() {
    return (
      <div>
        <Map
          className='map'
          zoomControl={false}
          ref={m => {this._leafletMap = m;}}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={attribution}
            url={tiles} />

          <MarkerLayer
            places={this.props.places}
            onSelectMarker={this.onSelectMarker.bind(this)}/>
        </Map>

        <MapControls
          onOpenAppInfo={this.props.onOpenAppInfo}
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)} />
      </div>
    )
  }

}
