import React, { Component } from 'react';

import '../../styles/team.css';

export default class TeamMember extends Component {
  render() {
    return (
      <div className="card-container">
        {this.props.pos ? <label>{this.props.pos.name}</label> : ''}
        <div className="card-content">
          <div className="card-image">
            <img src={this.props.photo} alt={this.props.name} />
          </div>
          <div className="card-body">
            <div className="padded">
              <h3>{this.props.name}</h3>
              {this.props.team ? (
                <div>
                  <span className="user-team">تیم {this.props.team}</span>
                </div>
              ) : (
                ''
              )}
              <div className="user-desc">{this.props.desc}</div>
            </div>
            {this.props.extra ? (
              <>
                <div
                  style={{
                    textAlign: 'center',
                    background: '#596e79',
                    color: 'white',
                    padding: 1,
                  }}
                >
                  {this.props.extra}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
