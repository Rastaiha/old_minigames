import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div class="card">
        <div class="card-header" onClick={this.props.onClick}>
          <div class="mb-0">
            <h5 class="faq-title">
              <span class="badge">{this.props.number}</span>
              {this.props.question}
            </h5>
          </div>
        </div>
        <div class="collapse">
          <div class="card-body">
            <p>{this.props.answer}</p>
          </div>
        </div>
      </div>
    );
  }
}
