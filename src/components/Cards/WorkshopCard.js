import React, { Component } from 'react';

import '../../styles/workshopCard.css';
export default class WorkshopCard extends Component {
  render() {
    return (
      <div className="card-container">
        {this.props.position ? <label>{this.props.position}</label> : ''}
        <div className="card-content">
          <div className="card-image">
            <img src={this.props.photo} alt={this.props.name} />
          </div>
          <div className="card-body">
            <div className="padded">
              <h3>{this.props.name}</h3>
              {/* <div className='show-workshop-btn'>
              مشاهده
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
