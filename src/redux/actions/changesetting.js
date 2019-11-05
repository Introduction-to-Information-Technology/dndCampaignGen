import { CHANGE_SETTING_INPUT } from '../constants/action-types';

export function changeSettingInput(payload) {
    return {
        type: CHANGE_SETTING_INPUT,
        payload: payload
    }
}

