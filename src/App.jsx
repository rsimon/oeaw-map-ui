import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

import MapControls from './MapControls/MapControls.jsx';

import '../public/style/app.scss';

const tiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [48.1638, 16.9528];
const zoomLevel = 8;

export default class App extends Component {

  openAppInfo() {
    console.log('TODO open app info')
  }

  zoomIn() {
    const map = this.leafletMap.leafletElement;
    map.zoomIn();
  }

  zoomOut() {
    const map = this.leafletMap.leafletElement;
    map.zoomOut();
  }

  render() {
    return (
      <div className='container'>
        <Map
          className='map'
          zoomControl={false}
          ref={m => {this.leafletMap = m;}}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={attribution}
            url={tiles} />
        </Map>

        <MapControls
          onOpenAppInfo={this.openAppInfo.bind(this)}
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
