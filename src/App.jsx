import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import AppInfo from './AppInfo.jsx';
import Map from './Map/Map.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';

import '../public/style/app.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      people : [], // All people in the dataset
      places : [], // All places in the dataset

      selectedPeople: [],  // Currently selected people

      placeDetailsFor: null, // Details model for a selected place, if any

      isAppInfoVisible: false // UI state: app info modal visible?
    }
  }

  componentDidMount() {
    axios.get('public/data/data.json')
      .then(result => {
        const people = result.data.map(record => {
          const clone = Object.assign({}, record);
          delete clone.places;
          return clone;
        });

        // An elaborate flatMap replacement... (sigh)
        const places = [].concat.apply([], result.data.map(record => {
          // TODO duplicates?
          return record.places;
        }));

        // Initial state
        this.setState({
          people: people,
          places: places,
          selectedPeople: [],
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
    if (person)
      this.setState({ selectedPeople: [ person.id ] });
    else 
      this.setState({ selectedPeople: [] });
  }

  onSelectPlace(place) {
    // TODO filter instead of find - allow multiple selected people
    const people = (place) ? this.state.people.filter(person => {
      return person.name == place.name;
    }).map(person => person.id) : null;

    this.setState({ selectedPeople: people });
  }

  render() {
    return (
      <div className='container'>
        <Map
          places={this.state.places}
          selectedPeople={this.state.selectedPeople}
          onSelectPlace={this.onSelectPlace.bind(this)}
          onOpenAppInfo={this.openAppInfo.bind(this)} />

        <Sidebar
          people={this.state.people}
          selectedPeople={this.state.selectedPeople}
          onSelectPerson={this.onSelectPerson.bind(this)} />

        {this.state.isAppInfoVisible &&
          <AppInfo onClose={this.closeAppInfo.bind(this)} />
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
