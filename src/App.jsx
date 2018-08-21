import React, { Component } from 'react';
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
      people : [], // All people in the dataset
      places : [], // All places in the dataset

      selectedPerson: null,  // Currently selected person, if any
      placeDetailsFor: null, // Details model for a selected place, if any

      isAppInfoVisible: false // UI state: app info modal visible?
    }
  }

  componentDidMount() {
    axios.get('public/data/data.json')
      .then(result => {
        // Pull out separate lists for people and places
        const people = result.data.map(record => {
          return { name: record.name };
        });

        // An elaborate flatMap replacement... (sigh)
        const places = [].concat.apply([], result.data.map(record => {
          return record.places;
        }));

        // Initial state
        this.setState({
          people: people,
          places: places,
          selectedPerson: null,
          placeDetailsFor: null
        });
      })
  }

  openAppInfo() {
    this.setState({ isAppInfoVisible: true });
  }

  closeAppInfo() {
    this.setState({ isAppInfoVisible: false });
  }

  onSelectPerson(person) {
    this.setState({ selectedPerson: person });
  }

  onSelectPlace(place) {
    // TODO
  }

  render() {
    return (
      <div className='container'>
        <Map
          places={this.state.places}
          selectedPerson={this.state.selectedPerson}
          onSelectPlace={this.onSelectPlace.bind(this)}
          onOpenAppInfo={this.openAppInfo.bind(this)} />

        <Sidebar
          people={this.state.people}
          selectedPerson={this.state.selectedPerson}
          onSelectPerson={this.onSelectPerson.bind(this)} />

        {this.state.isAppInfoVisible &&
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
              <h2>Using the Interface</h2>
              <ul className="using-the-interface">
                <li>Map controls</li>
                <li>Search</li>
              </ul>
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

        {this.state.placeDetailsFor &&
          <Modal className="locationdetails">
          </Modal>
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
