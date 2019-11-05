import { CHANGE_DROPDOWN_VISIBILITY } from "../constants/action-types";

export function changeDropdownVisibility(target) {
    return { 
        type: CHANGE_DROPDOWN_VISIBILITY,
        target
    }
};
