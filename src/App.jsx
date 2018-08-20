import React, { Component } from 'react';
import update from 'react-addons-update';
import { render } from 'react-dom';
import axios from 'axios';

import Modal from './common/Modal.jsx';
import Map from './Map/Map.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      people: [],
      places: [],
      showAppInfo: false,
      showLocationInfo: false
    }
  }

  componentDidMount() {
    axios.get('public/data/data.json')
      .then(result => {
        const people = result.data.map(record => {
          return { person: record.person };
        });

        // An elaborate flatMap replacement... (sigh)
        const places = [].concat.apply([], result.data.map(record => {
          return record.places;
        }));

        this.setState({
          people: people,
          places: places
        });
      })
  }

  openAppInfo() {
    this.setState({ showAppInfo: true });
  }

  closeAppInfo() {
    this.setState({ showAppInfo: false });
  }

  onSelectPerson(p) {
    this._map.selectByPerson(p.person);
  }

  onSelectPlace(place) {

  }

  render() {
    return (
      <div className='container'>
        <Map
          ref={c => this._map = c}
          places={this.state.places}
          onOpenAppInfo={this.openAppInfo.bind(this)}
          onSelectPlace={this.onSelectPlace.bind(this)} />

        <Sidebar
          people={this.state.people}
          onSelectPerson={this.onSelectPerson.bind(this)} />

        {this.state.showAppInfo &&
          <Modal
            className="appinfo"
            onClose={this.closeAppInfo.bind(this)}>
            <div className="header">
              <h1>Geschichte der SerbInnen in Wien (1741-1918)</h1>
            </div>
            <div className="content">
              <p className="project-abstract">
                A short project description...
              </p>
              <p cassName="using-the-interface">
                <h2>Using the Interface</h2>
                <ul>
                  <li>Map controls</li>
                  <li>Search</li>
                </ul>
              </p>
            </div>
            <div className="footer">
              <a href="http://www.oeaw.ac.at" target="_blank">
                <img className="logo oeaw" src="public/images/logo-oeaw.png" />
              </a>
              <div className="imprint">
                <span>Österreichische Akademie der Wissenschaften</span>
                <span>Dr. Ignaz Seipel-Platz 2</span>
                <span>1010 Wien</span>
              </div>

              <div className="developed-by">
                <span>Development by</span>
                <a href="http://www.ait.ac.at/" target="_blank">
                  <img className="logo ait" src="public/images/logo-ait.png" />
                </a>
              </div>
            </div>
          </Modal>
        }

        {this.state.showLocationInfo &&
          <Modal className="locationdetails">
          </Modal>
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
