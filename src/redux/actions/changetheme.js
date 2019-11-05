import { CHANGE_THEME_INPUT } from '../constants/action-types';

export function changeThemeInput(payload) {
    return {
        type: CHANGE_THEME_INPUT,
        payload: payload
    }
}

