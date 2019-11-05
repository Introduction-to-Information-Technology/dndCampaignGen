import { combineReducers } from 'redux';
import { uiReducer } from './uireducer';
import { ajaxReducer } from './ajaxreducer';

export default combineReducers({
    ui: uiReducer,
    ajax: ajaxReducer
});
  
