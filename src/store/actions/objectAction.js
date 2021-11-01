export const SET_OBJECT = 'SET_OBJECT';
export const SET_MODAL = 'SET_MODAL';

export const setObject = (data) => {
    return {
        type: SET_OBJECT,
        data
    }
}

export const setModal = (data) => {
    return {
        type: SET_MODAL,
        data
    }
}