import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';

import PersonDetails from './PersonDetails.jsx';

export default class PersonList extends Component {

  rowRenderer({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    const person = this.props.people[index];
    const isSelected = person == this.props.selected;
    return (
      <div
        key={key}
        data-idx={index}
        className={(isSelected ? "row selected" : "row")}
        style={style}
        onClick={this.props.onSelectPerson.bind(this, person)}>
        <span className="name">{person.name}</span>
      </div>
    )
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
                  rowCount={this.props.people.length}
                  rowHeight={40}
                  rowRenderer={this.rowRenderer.bind(this)} />
              )}
            </AutoSizer>
          </div>
        </div>

        <PersonDetails
          person={this.props.selected}
          onClose={this.props.onSelectPerson.bind(this, null)} />
      </div>
    )
  }
}
