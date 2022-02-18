import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import styles from '../../styles/mentor.module.css';
import { toPersianNumeral } from '../../utils/toPersianNumeral';
import getRandomColor from '../../utils/getRandomColor';
import { Link } from 'react-router-dom';
import { goToTeam } from '../../redux/actions/account';
import { connect } from 'react-redux';
import GradeModal from './GradeModal';
import moment from 'moment';
import { submitTeam } from '../../redux/actions/fsm';

class TeamCard extends React.Component {
  render() {
    const {
      name,
      mentorNum,
      team_members,
      alarm,
      current_state,
      uuid,
      team_id,
      workshop,
    } = this.props;

    const teamState = workshop.states
      ? workshop.states.filter((state) => {
          return +state.id === +current_state.state_id;
        })[0]
      : {};

    return (
      <div className={styles.cardContainer}>
        {alarm && (
          <div className={styles.notifIcon}>
            <Icon name="bell" color="red" size="big" />
          </div>
        )}
        <div className={`${styles.cardHeader} ${styles.spaceBetween}`}>
          <div style={{ alignSelf: 'center' }}>{name || team_id}</div>
          <div style={{ display: 'flex' }}>
            {team_members &&
              team_members.map((team_member, i) => (
                <div key={i} style={{ marginLeft: '-19px' }}>
                  <Popup
                    inverted
                    style={{
                      padding: '5px 8px',
                    }}
                    key={team_member.uuid}
                    content={team_member.name}
                    trigger={
                      <div
                        className="userFirstCharName"
                        style={{ background: getRandomColor() }}
                      >
                        {team_member.name[0]}
                      </div>
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={`${styles.workshopBody} ${styles.columnFlex}`}>
          <div className={styles.rowFlex}>
            <div style={{ marginLeft: '12px' }}>
              <Button fluid basic>
                تاریخچه
              </Button>
            </div>
            <div className={styles.rowFlex} style={{ width: 'fit-content' }}>
              <div className={styles.columnFlex} style={{ marginLeft: '18px' }}>
                <div>
                  <Icon name="clock" style={{ margin: '5px' }} />
                </div>
                <div style={{ fontWeight: 'light', fontSize: '.8em' }}>
                  {current_state
                    ? moment(current_state.start_time).format('hh:mm')
                    : ''}
                </div>
              </div>
              <div className={styles.columnFlex}>
                <div>
                  <Icon name="md user" style={{ margin: '5px' }} />
                </div>
                <div style={{ fontWeight: 'light', fontSize: '.8em' }}>
                  {mentorNum > 0
                    ? `${toPersianNumeral(mentorNum)} منتور`
                    : 'ندارد'}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>
              {current_state
                ? current_state.fsm_name + ' ' + current_state.state_name
                : ''}
            </h4>
          </div>
        </div>
        <div>
          <Button
            primary
            fluid
            style={{ marginBottom: '6px' }}
            as={Link}
            to={'/workshop/' + uuid}
            onClick={() => this.props.goToTeam({ team_id })}
          >
            مشاهده
          </Button>
        </div>
        <div>
          <GradeModal
            onSubmit={(grade, edge_id) => {
              this.props.submitTeam({
                grade,
                team_id,
                state_id: current_state.state_id,
                edge_id,
              });
            }}
            edges={teamState ? teamState.outward_edges : []}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { goToTeam, submitTeam })(TeamCard);
