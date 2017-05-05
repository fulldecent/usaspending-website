/**
 * ResultsColumnOption.jsx
 * Created by Lizzie Salita 05/03/17
 **/

import React from 'react';

const propTypes = {
    checked: React.PropTypes.bool,
    column: React.PropTypes.string,
    label: React.PropTypes.string,
    toggleColumnVisibility: React.PropTypes.func
};

export default class ResultsColumnOption extends React.Component {
    constructor(props) {
        super(props);

        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
    }

    toggleColumnVisibility() {
        this.props.toggleColumnVisibility(this.props.column);
    }

    render() {
        return (<li>
            <input
                type="checkbox"
                id={`column-${this.props.column}`}
                value={this.props.label}
                checked={this.props.checked}
                onChange={this.toggleColumnVisibility} />
            <label htmlFor={`column-${this.props.column}`}>
                {this.props.label}
            </label>
        </li>);
    }
}

ResultsColumnOption.propTypes = propTypes;