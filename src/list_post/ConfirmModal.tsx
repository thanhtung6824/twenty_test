import React from "react";
import {Modal} from '../components';

interface IConfirmModal {
    isOpen: boolean;
    toggle: (isOpen: boolean) => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({isOpen, toggle, onConfirm}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} title={'Are you sure want to delete this post?'}>
            <div className="px-10 py-10 float-right">
                <button
                    onClick={() => toggle(false)}
                    className="bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
        </Modal>
    )
};

export default ConfirmModal;

