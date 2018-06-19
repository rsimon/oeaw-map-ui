import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

import Sidebar from './Sidebar/Sidebar.jsx';
import MapControls from './MapControls/MapControls.jsx';

import '../public/style/app.scss';

const tiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const attribution = 'Map tiles: <a href="http://dare.ht.lu.se/">DARE 2018</a>';
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

        <Sidebar></Sidebar>

        <MapControls
          onOpenAppInfo={this.openAppInfo.bind(this)}
          onZoomIn={this.zoomIn.bind(this)}
          onZoomOut={this.zoomOut.bind(this)} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
