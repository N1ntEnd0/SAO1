import {SET_MODAL, SET_OBJECT} from "../actions/objectAction";

const initialState = {
    changeObject: {},
    modal: {
        visible: false
    }
}

export const objectReducer = (
    state = initialState,
    action) => {
    const {type, data} = action;
    switch (type) {
        case SET_OBJECT:
            return {...state, changeObject: data};
        case SET_MODAL:
            return {...state, modal: data};
        default:
            return state;
    }
}