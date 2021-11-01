import React from "react";
import {ModalView} from "./ModalView/ModalView";
import {useDispatch} from "react-redux";
import {setModal} from "../../store/actions/objectAction";


export const MODAL_VIEW = 'MODAL_VIEW';

export const Modal = ({type}) => {
    const dispatch = useDispatch();

    //todo ????
    const getModal = (type) => {
        switch (type) {
            default:
                return;
            case MODAL_VIEW:
                return <ModalView />
        }
    }

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        dispatch(setModal({
                            visible: false
                        }))
                    }}
                >
                    +
                </button>
                {getModal(type)}
            </div>
        </div>
    )
}