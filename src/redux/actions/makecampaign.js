import { MAKE_CAMPAIGN } from '../constants/action-types';

export function makeCampaign(payload) {
    return {
        type: MAKE_CAMPAIGN,
        payload
    }
}

