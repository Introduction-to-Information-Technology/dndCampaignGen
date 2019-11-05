import { 
    MAKE_AJAX, MAKE_CAMPAIGN
} from "../constants/action-types";

const initialState = {
   monsters: {},
   campaign: ""
   
};

export function ajaxReducer (state = initialState, action) {
    console.log('\naction made it to ajax reducer and a new state was consequentially returned')
    if (action.type === MAKE_AJAX && action.ajax == false ) {       
            console.log("got here") 
            return Object.assign({}, state, {
                monsters: action.payload
            });
        
    } else if (action.type == MAKE_CAMPAIGN ) {       
        return Object.assign({}, state, {
            campaign: action.payload
        });
    
    } 
    return state;
}

