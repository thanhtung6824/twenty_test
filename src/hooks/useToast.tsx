import {toast} from 'react-toastify';

type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

const useToast = () => {
    const showToast = (messages: string, type: TypeOptions) => {
        toast(messages, {
            type,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return [showToast]
};

export default useToast;

