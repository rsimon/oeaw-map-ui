import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

import PersonDetails from './PersonDetails.jsx';

export default class PersonList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: props.people,
      selected: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.people)
      this.setState({ people: nextProps.people });
  }

  rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    const p = this.state.people[index];

    return (
      <div
        key={key}
        data-idx={index}
        className="row"
        style={style}
        onClick={this.selectPerson.bind(this)}>

        <span className="name">{p.person}</span>
      </div>
    )
  }

  filter(query) {
    const filtered = this.props.people.filter(p => {
      return p.person.toLowerCase().startsWith(query.toLowerCase());
    });

    this.setState({
      people: filtered,
      selected: null
    });
  }

  selectPerson(e) {
    const row = e.target.closest('.row');
    const idx = row.dataset.idx;
    const person = this.state.people[idx];
    this.setState({ selected: person });
    this.props.onSelectPerson(person);
  }

  deselectPerson(e) {
    this.setState({ selected: null });
  }

  render() {
    return (
      <div className="body">
        <div className="personlist">
          <div className="header">
            <span className="name">Name</span>
            <span className="date">Date</span>
            <span className="gender">Gender</span>
          </div>

          <div className="container">
            <AutoSizer>
              {({ height, width}) => (
                <List
                  className="rows"
                  width={width}
                  height={height}
                  rowCount={this.state.people.length}
                  rowHeight={40}
                  rowRenderer={this.rowRenderer.bind(this)} />
              )}
            </AutoSizer>
          </div>
        </div>

        <PersonDetails
          person={this.state.selected}
          onClose={this.deselectPerson.bind(this)} />
      </div>
    )
  }
}
