import Api from 'services/api';
import {
  GET_INSTANCES,
  GET_INSTANCES_SUCCESS,
  GET_INSTANCES_FAILURE,
} from './types';

export function getInstances() {
  return (dispatch) => {
    dispatch({ type: GET_INSTANCES });
    return Api.get('v1/instances')
      .then(res => dispatch({ type: GET_INSTANCES_SUCCESS, payload: res.data }))
      .catch(error => dispatch({ type: GET_INSTANCES_FAILURE, payload: error.data }));
  };
}
