import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import PersonList from './components/PersonList.jsx';
import SearchBox from './components/SearchBox.jsx';
import ZoomControl from './components/controls/ZoomControl.jsx';

import '../public/style/app.scss';

const stamenTonerTiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [48.1638, 16.9528];
const zoomLevel = 8;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentZoomLevel: zoomLevel };
  }

  zoomIn() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.zoomIn();
  }

  zoomOut() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.zoomOut();
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  render() {
    return (
      <div className='container'>
        <PersonList></PersonList>
        <SearchBox></SearchBox>

        <Map
          className='map'
          zoomControl={ false }
          ref={m => {this.leafletMap = m;}}
          center={ mapCenter }
          zoom={ zoomLevel }>

          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles} />
        </Map>

        <ZoomControl zoomIn={this.zoomIn.bind(this)} zoomOut={this.zoomOut.bind(this)}></ZoomControl>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
