import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import PersonList from './components/PersonList.jsx';
import SearchBox from './components/SearchBox.jsx';

const stamenTonerTiles = 'https://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [48.1638, 16.9528];
const zoomLevel = 8;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentZoomLevel: zoomLevel };
    this.handleUpPanClick = this.handleUpPanClick.bind(this);
    this.handleRightPanClick = this.handleRightPanClick.bind(this);
    this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
    this.handleDownPanClick = this.handleDownPanClick.bind(this);
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

  handleUpPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, -100]);
  }

  handleRightPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([100, 0]);
  }

  handleLeftPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([-100, 0]);
  }

  handleDownPanClick() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.panBy([0, 100]);
  }

  render() {
    return (
      <div>
        <PersonList></PersonList>
        <SearchBox></SearchBox>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={mapCenter}
          zoom={zoomLevel}>

          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles} />

          <Control position="topright">
            <div style={{
              backgroundColor: 'black',
              padding: '5px' }}>

              <div style={{ marginLeft: '37px' }}>
                <button onClick={this.handleUpPanClick}>Pan up</button>
              </div>

              <div>
                <button onClick={this.handleLeftPanClick}>Pan left</button>
                <button onClick={this.handleRightPanClick}>Pan right</button>
              </div>

              <div style={{ marginLeft: '30px' }}>
                <button onClick={this.handleDownPanClick}>Pan down</button>
              </div>

            </div>
          </Control>
        </Map>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
