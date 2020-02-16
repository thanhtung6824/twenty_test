import {useState} from 'react';

interface IUseModal {
    (): [boolean, (isOpen: boolean) => void];
}

const useModal: IUseModal = () => {
    const [isOpen, setIsShowing] = useState<boolean>(false);
    const toggle = (isOpen: boolean) => {
        setIsShowing(isOpen);
    };

    return [
        isOpen,
        toggle,
    ]
};

export default useModal;
