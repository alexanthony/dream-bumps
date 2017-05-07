// @flow
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import seatNumberToName from '../utils/seatNumberToName';
import {cancelBuyMember, doSellRower} from './actions';
import {getCrew, getCrewMemberName, getBuyMemberId, isMarketOpen} from '../rootReducer';
import {fetchCrewMembers, fetchCrew} from '../crews/actions';

class UserCrewMemberRow extends Component {
  componentDidMount() {
    if (this.props.member) {
      this.loadCrew(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.member && (!this.props.member || nextProps.member.crewId !== this.props.member.crewId)) {
      this.loadCrew(nextProps);
    }
  }

  loadCrew(props) {
    if (this.props.member.crewId) {
      this.props.fetchCrewMembers(this.props.member.crewId);
      this.props.fetchCrew(this.props.member.crewId);
    }
  }

  render() {
    const {
      member,
      crew,
      crewMemberName,
      onClickBuy,
      buyMemberId,
      cancelBuyMember,
      doSellRower,
      marketOpen,
      canBuySell
    } = this.props;
    return (
      <TableRow>
        <TableRowColumn style={{paddingLeft:0, paddingRight:0, width: '45px'}}>{seatNumberToName(member.seat)}</TableRowColumn>
        <TableRowColumn style={{paddingLeft:0, paddingRight:'5px'}}>
          {
            crew ?
              crew.name
            :
              '-'
          }
        </TableRowColumn>
        <TableRowColumn style={{paddingLeft:0, paddingRight: 0}}>{crewMemberName}</TableRowColumn>
        <TableRowColumn style={{paddingLeft:0, paddingRight: '5px', width: '75px', textAlign: 'right'}}>
          {
            crew && crew.price && crew.price.toFixed ?
              crew.price.toFixed(2)
            :
              ''
          }
        </TableRowColumn>
        {
          marketOpen && canBuySell ?
            <TableRowColumn style={{paddingLeft:0, paddingRight:0, width: '75px'}}>
              {
                member.crewId && !buyMemberId ?
                  <RaisedButton primary label="Sell" style={{minWidth: '70px'}} onClick={e => doSellRower(member.crewId, member.id)}/>
                :
                  member.id === buyMemberId ?
                    <RaisedButton primary label="Cancel" style={{minWidth: '70px'}} labelStyle={{paddingLeft: '2px', paddingRight:0}}  onClick={cancelBuyMember}/>
                  :
                    buyMemberId ?
                      null
                    :
                      <RaisedButton primary label="Buy" style={{minWidth: '70px'}} onClick={onClickBuy}/>
              }
            </TableRowColumn>
          :
            null
        }
      </TableRow>
    )
  }
}

// const CurrentUserCrewMemberRow = ({
//   member,
//   crew,
//   crewMemberName,
//   onClickBuy,
//   onClickCancel,
//   buyMemberId,
//   cancelBuyMember,
//   doSellRower,
//   marketOpen,
//   canBuySell
// }) => (
//   <TableRow>
//     <TableRowColumn>{seatNumberToName(member.seat)}</TableRowColumn>
//     <TableRowColumn>
//       {
//         crew ?
//           crew.name
//         :
//           '-'
//       }
//     </TableRowColumn>
//     {/*<TableRowColumn>{crewMemberName}</TableRowColumn>*/}
//     <TableRowColumn>
//       {
//         crew ?
//           crew.price
//         :
//           ''
//       }
//     </TableRowColumn>
//     {
//       marketOpen && canBuySell ?
//         <TableRowColumn>
//           {
//             member.crewId ?
//               <RaisedButton label="Sell" onClick={e => doSellRower(member.crewId, member.id)}/>
//             :
//               member.id === buyMemberId ?
//                 <RaisedButton label="Cancel" onClick={cancelBuyMember}/>
//               :
//                 buyMemberId ?
//                   null
//                 :
//                   <RaisedButton label="Buy" onClick={onClickBuy}/>
//           }
//         </TableRowColumn>
//       :
//         null
//     }
//   </TableRow>
// );

UserCrewMemberRow.propTypes = {
  member: PropTypes.object,
  crew: PropTypes.object,
  crewMemberName: PropTypes.string,
  onClickBuy: PropTypes.func,
  buyMemberId: PropTypes.number,
  cancelBuyMember: PropTypes.func,
  doSellRower: PropTypes.func,
  marketOpen: PropTypes.bool,
  canBuySell: PropTypes.bool,
  fetchCrewMembers: PropTypes.func,
  fetchCrew: PropTypes.func
};

const mapStateToProps = (state, {member}) => ({
  crew: getCrew(state)(member.crewId),
  crewMemberName: getCrewMemberName(state)(member.crewId, member.seat) || '',
  buyMemberId: getBuyMemberId(state),
  marketOpen: isMarketOpen(state)
});

export {UserCrewMemberRow};

export default connect(mapStateToProps, {cancelBuyMember, doSellRower, fetchCrewMembers, fetchCrew})(UserCrewMemberRow);