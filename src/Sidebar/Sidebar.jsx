import React, { Component } from 'react';

export default class Sidebar extends Component {

  toggle() {
    console.log('toggle sidebar');
  }

  render() {
    return (
      <div className="sidebar">
        <div className="content">
          {/*
          <SearchBox>
            <!-- TODO -->
          </SearchBox>
          <PersonList>
            <!-- TODO -->s
          </PersonList>
          */}
        </div>
        <div className="tab">
          <button onClick={this.toggle}>&#xf002;</button>
        </div>
      </div>
    )
  }
}
