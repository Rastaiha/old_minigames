import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from '../../styles/mentor.module.css';
import { toPersianNumeral } from '../../utils/toPersianNumeral';
import { Link } from 'react-router-dom';

export default class WorkshopCard extends React.Component {
  render() {
    const { name, mentorNum, teamNum, id } = this.props;
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          {name}
          <div className={styles.editIcon}>
            <Button
              icon="pencil alternate"
              color="blue"
              as={Link}
              to={'/fsm/' + id}
            />
          </div>
        </div>
        <div className={styles.workshopBody}>
          <div>
            <Icon name="group" style={{ margin: '5px' }} />
            {toPersianNumeral(teamNum)} تیم
          </div>
          <div>
            <Icon name="user md" style={{ margin: '5px' }} />
            {toPersianNumeral(mentorNum)} منتور
          </div>
        </div>
        <div>
          <Button primary fluid>
            مشاهده
          </Button>
        </div>
      </div>
    );
  }
}
