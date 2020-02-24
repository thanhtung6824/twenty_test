import React, {useEffect, useRef, ReactElement} from 'react';
import {createPortal} from 'react-dom';

import {useOnClickOutside} from "../hooks";

interface Props {
    isOpen: boolean;
    toggle: (isOpen: boolean) => void;
    title: string;
    children: ReactElement | ReactElement[]
}

const modalRoot = document.getElementById('modal');

const Modal: React.FC<Props> = ({isOpen, toggle, title , children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const el = document.createElement('div');

    useOnClickOutside(ref, () => toggle(false));

    useEffect(() => {
        if (modalRoot) modalRoot.appendChild(el);


        return (() => {
            if (modalRoot) modalRoot.removeChild(el);
        })
    });

    return (
        isOpen ? createPortal(
            <React.Fragment>
                <div className="flex absolute w-full top-0 bottom-0 justify-center items-center">
                    <div
                        tabIndex={0}
                        className="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 bottom-0"/>
                    <div ref={ref} style={{top: 200, minWidth: 400}} className="ease-in-out absolute z-50 bg-white">
                        <div className="h-12 flex flex-row justify-between border-b border-gray-300">
                            <span className="modal-title self-center ml-2 font-bold text-gray-600">{title}</span>
                            <button
                                onClick={() => toggle(false)}
                                className="focus:outline-none hover:bg-gray-300 h-10 w-10 tooltip">
                                <i className="fas fa-times text-gray-500"/>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </React.Fragment>, el
        ) : null
    )
};

export default Modal;
