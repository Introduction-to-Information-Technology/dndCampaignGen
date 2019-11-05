import { 
    CHANGE_MENU_VISIBILITY, CHANGE_DROPDOWN_VISIBILITY, 
    CHANGE_SETTING_INPUT, CHANGE_LEVEL_INPUT, CHANGE_THEME_INPUT
} from "../constants/action-types";

const initialState = {
    mobileMenuVisibility: false,
    dropdownVisibility: {
        setting: false,
        level: false,
        theme: false
    },
    settingTextInput: "",
    levelTextInput: "",
    themeTextInput: ""
};

export function uiReducer (state = initialState, action) {
    console.log('\naction made it to ui reducer and a new state was consequentially returned')
    if (action.type === CHANGE_MENU_VISIBILITY ) {        
        return Object.assign({}, state, {
            mobileMenuVisibility: !state.mobileMenuVisibility
        });
    } else if (action.type == CHANGE_DROPDOWN_VISIBILITY & action.target !== "body") {   
        return Object.assign({}, state, {
            dropdownVisibility: Object.assign({}, state.dropdownVisibility, {
                [action.target]: !state.dropdownVisibility[action.target]
            })
        });     
    } else if (action.type == CHANGE_DROPDOWN_VISIBILITY & action.target == "body") {        
            console.log("reset dropdowns")
            return Object.assign({}, state, {
                dropdownVisibility: {
                    setting: false,
                    level: false,
                    theme: false
                }
            });
        
    } else if (action.type == CHANGE_SETTING_INPUT) {        
        return Object.assign({}, state, {
            settingTextInput: action.payload 
        });
    } else if (action.type == CHANGE_LEVEL_INPUT) {        
        return Object.assign({}, state, {
            levelTextInput: action.payload 
        });
    } else if (action.type == CHANGE_THEME_INPUT) {        
        return Object.assign({}, state, {
            themeTextInput: action.payload 
        });
    }
    return state;
}

