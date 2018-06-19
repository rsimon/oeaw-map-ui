import React, { Component } from 'react';

export default class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  focus() {
    this._input.focus();
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({value: value});
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="searchbox">
        <input
          type="text"
          placeholder="Search list..."
          value={this.state.value}
          ref={(c) => this._input = c}
          onChange={this.onChange.bind(this)} />
      </div>
    )
  }
}
