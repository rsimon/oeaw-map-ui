import React, { Component } from 'react';

export default class InfoButton extends Component {

  render() {
    return (
      <button className="control info" onClick={this.props.onClick}>i</button>
    )
  }

}
