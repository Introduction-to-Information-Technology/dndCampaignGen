import { MAKE_AJAX } from '../constants/action-types';

export function makeAjax(payload, ajax, route) {
    return {
        type: MAKE_AJAX,
        payload: payload,
        ajax,
        route
    }
}

