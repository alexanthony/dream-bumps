// @flow
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import { fetchCrews } from '../crews/actions';
import { getNumberOfDivisions, getCrewsByDivision, getCurrentDay, isMarketOpen } from '../rootReducer';
import DivisionTable from './DivisionTable';

class CrewList extends React.Component {
  componentWillMount() {
    this.props.fetchCrews(this.props.sex);
  }

  render() {
    const dayTitle = this.props.day >= 4 ? 'Finishing Order' : `Starting Order for Day ${this.props.day + 1}`
    const statusSuffix = this.props.marketOpen ? '' : ' - Market is Closed'
    return (
      <Card>
        <CardTitle title={`${dayTitle}${statusSuffix}`} />
        <CardText>
          {
            Object.keys(this.props.crews).map(key =>
              (
                <DivisionTable
                  sex={this.props.sex}
                  division={key}
                  key={key}
                  crews={this.props.crews[key]}
                  day={this.props.day}
                />
              )
            )
          }
        </CardText>
      </Card>
    );
  }
}

CrewList.propTypes = {
  fetchCrews: PropTypes.func,
  sex: PropTypes.string,
  numberOfDivisions: PropTypes.number,
  crews: PropTypes.object,
  day: PropTypes.number,
  marketOpen: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  crews: getCrewsByDivision(state)(ownProps.sex),
  numberOfDivisions: getNumberOfDivisions(state)(ownProps.sex),
  day: getCurrentDay(state),
  marketOpen: isMarketOpen(state)
});

export {CrewList};

export default connect(mapStateToProps, { fetchCrews })(CrewList);
