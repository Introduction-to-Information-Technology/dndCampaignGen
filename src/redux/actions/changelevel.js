import { CHANGE_LEVEL_INPUT } from '../constants/action-types';

export function changeLevelInput(payload) {
    return {
        type: CHANGE_LEVEL_INPUT,
        payload: payload
    }
}

