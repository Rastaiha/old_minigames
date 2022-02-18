import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const ListItem = styled.li`
  display: inline-block;
`;

class CodingGameNav extends Component {
  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    return (
      <div className="coding-game-nav">
        <ul
          style={{
            listStyleType: 'none',
            listStyle: 'none',
            top: '0px',
            left: '-30px',
            position: 'absolute'
          }}
        >
          <ListItem>
            <Icon
              name="square"
              onClick={this.props.onSquareIconClick}
              style={{
                cursor: 'pointer',
              }}
            />
          </ListItem>
          <ListItem>
            <Icon
              name="circle"
              onClick={this.props.onCircleIconClick}
              style={{
                cursor: 'pointer',
              }}
            />
          </ListItem>
          <ListItem>
            <Icon
              name="trash"
              onClick={this.props.onTrashIconClick}
              style={{
                cursor: 'pointer',
              }}
            />
          </ListItem>
        </ul>
      </div>
    );
  }
}

export default CodingGameNav;
