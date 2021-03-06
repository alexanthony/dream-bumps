// @flow
import React, {PropTypes} from 'react';
import {Grid, Cell} from 'material-grid/dist';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {getCrewsForSex} from '../rootReducer';

const CrewAdminList = ({crews}: {crews:Array<Object>}) => (
  <Grid>
    {crews.map(crew =>
      <Cell key={crew.id} col={4}>
        <RaisedButton label={crew.name} containerElement={<Link to={`/admin/crews/${crew.id}`} />} />
      </Cell>
    )}
  </Grid>
)

CrewAdminList.propTypes = {
  crews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number
  })),
  sex: PropTypes.string
};

export const mapStateToProps = (state: Object, ownProps: Object) => ({
  crews: getCrewsForSex(state)(ownProps.sex)
});

export {CrewAdminList};
export default connect(mapStateToProps)(CrewAdminList);
