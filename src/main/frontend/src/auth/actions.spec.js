import {logOut} from './actions';

import * as types from '../actionTypes';

it('Should log out correctly', () => {
  const dispatch = jest.fn();

  logOut()(dispatch);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch.mock.calls[0][0]).toEqual({ type: types.LOGOUT_REQUEST });
  expect(dispatch.mock.calls[1][0]).toEqual({ type: types.LOGOUT_SUCCESS, message: 'Logged out' });
})
// describe('User Login', () => {
//     it('dispatches MANUAL_LOGIN_USER and LOGIN_SUCCESS_USER when Manual Login returns status of 200 and routes user to /', (done) => {
//       const expectedActions = [
//       {
//         type: types.LOGIN_REQUEST
//       },
//       {
//         type: types.LOGIN_SUCCESS,
//         message: response.data.message
//       },
//       {
//         payload: {
//           args: ['/'],
//           method: 'push'
//         },
//         type: '@@router/CALL_HISTORY_METHOD'
//       }];
//
//       sandbox.stub(axios, 'post').returns(Promise.resolve(response));
//
//       const store = mockStore(initialState);
//       store.dispatch(actions.manualLogin(data))
//         .then(() => {
//           expect(store.getActions()).toEqual(expectedActions);
//         }).then(done)
//         .catch(done);
//     });
//
//     it('dispatches MANUAL_LOGIN_USER and LOGIN_ERROR_USER when Manual Login returns status that is NOT 200', (done) => {
//       const expectedActions = [
//       {
//         type: types.MANUAL_LOGIN_USER
//       },
//       {
//         type: types.LOGIN_ERROR_USER,
//         message: errMsg.response.data.message
//       }];
//
//       sandbox.stub(axios, 'post').returns(Promise.reject(errMsg));
//
//       const store = mockStore(initialState);
//       store.dispatch(actions.manualLogin(data))
//         .then(() => {
//           expect(store.getActions()).toEqual(expectedActions);
//         }).then(done)
//         .catch(done);
//     });
//   });
