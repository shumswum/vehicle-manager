import { combineReducers } from 'redux';
import vehicles from './components/vehicle/vehicleReducer';
import customers from './components/customer/customerReducer';

const reducers = combineReducers({
    vehicles,
    customers
});

export default reducers;